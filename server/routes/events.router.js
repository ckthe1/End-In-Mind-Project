const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', (req, res) => {

  const communityId = req.query.communityId;
  console.log('getting events...', communityId);

  const columnsToSelect = `events.id, event_name, event_type, expected_attendees, start_time,
  end_time, location, events.description, contact_name, contact_email, contact_phone, community_id, 
  communities.name AS community_name, communities.description AS community_description`

  // If no community is specified, just return all the events-------------------------
  if (!communityId) {
    pool.query(`
      SELECT ${columnsToSelect} FROM "events" 
      JOIN "communities" ON "events"."community_id" = "communities"."id" 
      ORDER BY "events"."id" DESC;`)

    .then (response => {
      const convertedEvents = response.rows.map( event => convertEvent(event));
      res.send(convertedEvents);

    }).catch(error => {
      console.log('error getting events!', error);
      res.sendStatus(500);
    })
  }

  // When community is specified, we return only events related to that community.-----
  else {
    pool.query(`
    SELECT ${columnsToSelect} FROM "events" 
      JOIN "communities" ON "events"."community_id" = "communities"."id"
      WHERE "community_id" = $1
      ORDER BY "events"."id" DESC;`, [communityId])

  .then (response => {
    const convertedEvents = response.rows.map( event => convertEvent(event))
    res.send(convertedEvents)
  })
  .catch(error => {
    console.log('error getting events!', error);
    res.sendStatus(500);
  })
  }
});

router.get('/specific', rejectUnauthenticated, (req, res) => {

  console.log("in get specific event route", req.query);

  pool.query(`
  SELECT "events"."id", "event_name", "event_type", "location", 
"events"."description", "contact_name", "contact_phone", "events"."created_at", 
"author_user_id", "follow_up_complete",
"follow_up_comments", "start_time", "end_time", 
"communities"."id" as "community_id", 
"communities"."name" as "community_name"
 FROM "events" 
  JOIN "communities" ON "events"."community_id" = "communities"."id" 
  WHERE "events"."id" = $1;`, [req.query.id])

  .then (response => {

    console.log(response);

    // for calendar to read the dates, they need to be converted from strings to Date objects
    const convertedEvents = response.rows.map( event => convertEvent(event))

    res.send(convertedEvents)
  })

  .catch(error => {
    console.log('error getting events!', error);
    res.sendStatus(500);
  })
    
});

function convertEvent(rawEvent) {
  let newEvent = {...rawEvent};
  newEvent.start = rawEvent.start_time;
  newEvent.end = rawEvent.end_time;
  newEvent.title = rawEvent.event_name;
  newEvent.eventType = rawEvent.event_type;
  newEvent.expectedAttendees = rawEvent.expected_attendees;
  newEvent.community = rawEvent.name;
  // console.log('new event is:', newEvent);
  return newEvent;
}

router.put('/followup', (req, res) => {

  console.log('in followup route', req.query);
  
  pool.query(`
    UPDATE "events"
    SET "follow_up_comments" = $1
    WHERE "id" = $2;`, 
    [req.query.comments, req.query.eventId])

  .then(result => {
    console.log("everything is just dandy");
    res.sendStatus(200);
  })

  .catch(error => {
    console.log("error in followup route", error);
    res.sendStatus(500);
  });
})


// Patrick's get request that grabs all users contact info from the selected community 
router.get('/contacts/:id', (req, res) => {

  const queryText = `SELECT "full_name", "email", "phone_number" FROM "users" WHERE "community_id"=($1)`;
  pool.query(queryText, [Number(req.params.id)])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error with GET', err);
        res.sendStatus(500);
      });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log(req.body);
  let event = req.body;

  // On the client, a date, starttime, and endtime are selected. we need to turn that
  // into a start timestamp and an end timestamp
  let startTime = MergeDayAndTime(event.selectedDate, event.start_time);
  let endTime = MergeDayAndTime(event.selectedDate, event.end_time);

  const queryText = `INSERT INTO "events"
    (event_name, 
    event_type, 
    expected_attendees, 
    start_time,
    end_time,
    location, 
    description, 
    contact_name, 
    contact_email, 
    contact_phone, 
    community_id, 
    author_user_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`
    pool.query(queryText,[
    event.eventTitle,
    event.eventTypeArray,
    event.audienceSize,
    startTime,
    endTime,
    event.location,
    event.description,
    event.contactName,
    event.contactEmail,
    event.contactPhone,
    event.communityId,
    event.authorUserId,
])
  .then(() => {res.sendStatus(201)})
  .catch((err) => {
      console.log('error posting event', err);
      res.sendStatus(500);
  })
});


router.put('/', (req, res) => {
  console.log(req.body);
  let event = req.body;
  const queryText = `UPDATE "events" SET
    event_name=$1, 
    expected_attendees=$2, 
    start_time=$3,
    end_time=$4,
    location=$5, 
    description=$6, 
    contact_name=$7, 
    contact_email=$8, 
    contact_phone=$9 
    WHERE id=$10;`
  pool.query(queryText, [
    event.eventTitle,
    event.audienceSize,
    event.start_time,
    event.end_time,
    event.location,
    event.description,
    event.contactName,
    event.contactEmail,
    event.contactPhone,
    event.eventId,
  ])
    .then(() => { res.sendStatus(201) })
    .catch((err) => {
      console.log('error posting event', err);
      res.sendStatus(500);
    })
});
/**Using only the day from the first param and only the time from the second,
makes a new date and returns it. */
const MergeDayAndTime =(dateForDay, dateForTime) => {

  const outputDate = new Date(dateForDay);
  dateForTime = new Date(dateForTime);

  const hours = dateForTime.getHours();
  const minutes = dateForTime.getMinutes();

  // console.log('hours and minutes:', hours, minutes);

  outputDate.setHours(hours, minutes, 0);
  return outputDate;
}

module.exports = router;