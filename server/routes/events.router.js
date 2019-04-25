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
    console.log('response.row',response.rows);
    
    // for calendar to read the dates, they need to be converted from strings to Date objects
    const convertedEvents = response.rows.map( event => {
      let newEvent = {...event};
      newEvent.start = Date(event.start_time);
      newEvent.end = Date(event.end_time);
      newEvent.date = Date(event.event_date);
      newEvent.title = event.event_name;
      newEvent.eventType = event.event_type;
      newEvent.expectedAttendees = event.expected_attendees;
      newEvent.community = event.name;
      return newEvent;
    })
    res.send(convertedEvents)
  
  })

  .catch(error => {
    console.log('error getting events!', error);
    res.sendStatus(500);
  })
    
});


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
    start_time,
    end_time,
    location, 
    description, 
    contact_name, 
    contact_email, 
    contact_phone, 
    community_id, 
    author_user_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);`
    pool.query(queryText,[
    event.eventTitle,
    event.eventTypeArray,
    event.audienceSize,
    event.selectedDate,
    event.start_time,
    event.end_time,
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