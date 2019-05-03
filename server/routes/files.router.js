const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from "files"`;
  pool
    .query(queryText)
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log(error);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  console.log("request to post a new file", req.body);

  // now that we have the file in the bucket, we need to add
  // to our database
  const queryText = `INSERT INTO "files" ("title", "description", "author_user_id", "url", "key") 
        VALUES ($1, $2, 1, $3, $4)`;

  pool
    .query(queryText, [
      req.body.title,
      req.body.description,
      req.body.url,
      req.body.key
    ])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.delete("/", rejectUnauthenticated, (req, res) => {
  
  // Reject any attempts to delete where the user isn't a super admin
  if (!req.user.is_super_admin) {
    console.log('Attempted to delete file from a non-super-admin account.', req.user);
    res.sendStatus(500);
    return;
  }

  pool
    .query(`DELETE FROM "files" WHERE "id"=$1;`, [req.query.id])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      console.log("there was an error on the delete query", error);
      res.sendStatus(500);
    });
});

module.exports = router;
