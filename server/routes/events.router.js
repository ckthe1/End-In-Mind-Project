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
      newEvent.start = Date(event.start_time);
      newEvent.end = Date(event.end_time);
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

  console.log(req.body);

  // TODO actually add this to the database
  pool.query(``)
});

module.exports = router;