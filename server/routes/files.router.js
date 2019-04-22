const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * from "files"`;
    pool.query(queryText)
    .then (response => {
        res.send(response.rows);
    })
    .catch ( error => {
        res.sendStatus(500);
        console.log(error);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

    console.log("request to post a new file", req.body);

    // now that we have the file in the bucket, we need to add
    // to our database 
    const queryText = `INSERT INTO "files" ("title", "description", "author_user_id", "url", "key") 
        VALUES ($1, $2, 1, $3, $4)`;

    pool.query(queryText, [req.body.title, req.body.description, req.body.url, req.body.key])
    .then(response => {
        res.sendStatus(200);
    })
    .catch( error => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;