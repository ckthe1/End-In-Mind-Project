const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

    console.log("request to post a new file", req.body);

    // now that we have the file in the bucket, we need to add
    // to our database 
    const queryText = `INSERT INTO "files" ("title", "description", "author_user_id", "url") 
        VALUES ($1, $2, 1, $3)`;

    pool.query(queryText, [req.body.title, req.body.description, req.body.url])
    .then(response => {
        res.sendStatus(200);
    })
    .catch( error => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;