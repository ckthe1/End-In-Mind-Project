const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "attendees" ORDER BY id"`)
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.log('error getting attendees', error);
            res.sendStatus(500);
        })

});


// Gets all the attendees info for a particular event
router.get('/for-event', rejectUnauthenticated, (req, res) => {

    const eventId = req.query.id;

    pool.query(`
    SELECT first_name, last_name, dob, sex, race, household_income, email, phone, event_id FROM "attendees" 
    JOIN "attendees_events" ON "attendees"."id" = "attendees_events"."attendee_id"
    JOIN "events" ON "attendees_events"."event_id" = "events"."id"
    WHERE "event_id" = $1
    ORDER BY "attendees_events".id;`, [eventId])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log('error getting attendees', error);
            res.sendStatus(500);
        })

});


/**
 * POST route template
 */

router.post('/', (req, res) => {
    console.log(req.body);
    let attendee = req.body;
    const queryText = `INSERT INTO "attendees"
    (first_name,
    last_name, 
    dob, 
    sex, 
    race, 
    household_income, 
    email, 
    phone)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING "id";`
    pool.query(queryText, [
        attendee.firstName,
        attendee.lastName,
        attendee.birthDate,
        attendee.ethnicity,
        attendee.gender,
        attendee.income,
        attendee.contactEmail,
        attendee.contactPhone,
    ]).then((results) => { 
            let attendeeId = results.rows[0].id;
            const queryText = `INSERT INTO "attendees_events" (event_id, attendee_id) VALUES ($1,$2);`
                pool.query(queryText, [attendee.eventId, attendeeId]
        )}).then(() => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('error posting attendees', error);
            res.sendStatus(500);
        })
});

module.exports = router;