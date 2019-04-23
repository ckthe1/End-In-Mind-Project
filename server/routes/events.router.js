const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

  pool.query(`SELECT * FROM "events" JOIN "communities" ON "events"."community_id" = "communities"."id" ORDER BY "events"."id"`)

  .then (response => {

    const convertedEvents = response.rows.map( event => convertEvent(event))
    res.send(convertedEvents)
  })

  .catch(error => {
    console.log('error getting events!', error);
    res.sendStatus(500);
  })
    
});

router.get('/specific', rejectUnauthenticated, (req, res) => {

  console.log("in get specific event route", req.query);

  pool.query(`SELECT * FROM "events" 
  JOIN "communities" ON "events"."community_id" = "communities"."id"
  WHERE "events"."id" = $1;`, [req.query.id])

  .then (response => {

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
  return newEvent;
}


// Patrick's get request that grabs all users contact info from the selected community 
router.get('/contacts/:id', rejectUnauthenticated, (req, res) => {

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
  const queryText = `INSERT INTO "events"
    (event_name, 
    event_type, 
    expected_attendees, 
    event_date, 
    location, 
    description, 
    contact_name, 
    contact_email, 
    contact_phone, 
    community_id, 
    author_user_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`
    pool.query(queryText,[
    event.eventTitle,
    event.eventTypeArray,
    event.audienceSize,
    event.selectedDate,
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

module.exports = router;