const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

  pool.query(`SELECT * FROM "events"`)

  .then (response => {

    // for calendar to read the dates, they need to be converted from strings to Date objects
    const convertedEvents = response.rows.map( event => {

      let newEvent = {...event};
      newEvent.start = event.start_time;
      newEvent.end = event.end_time;
      newEvent.title = event.event_name;
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

  // TODO actually add this to the database
  pool.query(``)
});

module.exports = router;