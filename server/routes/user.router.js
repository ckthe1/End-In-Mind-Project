const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const allowedProperties = ["is_super_admin", "is_community_admin", "approved"];

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Sending back array of ALL users
router.get('/all', rejectUnauthenticated, (req, res) => {

  pool
    .query(
      `SELECT "users"."id", "full_name", "username", "email", "is_super_admin", "is_community_admin", "approved",
      "name" AS "community_name" 
      FROM "users" 
      JOIN "communities" 
      ON "users"."community_id" = "communities"."id"
      ORDER BY "users"."id";
`
    )
    .then(result => res.send(result.rows))

    .catch(error => {
      console.log("error getting all users", error);
      res.sendStatus(500);
    });
})

router.put('/', rejectUnauthenticated, (req, res) => {

  console.log("putting user", req.body);

  // If the property string doesnt match exactly, reject the request
  if (!allowedProperties.includes(req.body.property)) {
    res.sendStatus(500);
    console.log("Invalid property name ", req.body.property);
    return;
  }

  pool
    .query(
      `UPDATE "users" SET ${req.body.property} = $1 WHERE "id" = $2;`,

      [req.body.value, req.body.user.id]
    )
    .then(result => res.sendStatus(200))

    .catch(error => {
      console.log("error modifying user", error);
      res.sendStatus(500);
    });

})

router.delete("/:id", (req, res) => {
  console.log("/ DELETE request was hit");
  console.log("req.params", req.params);
  pool
    .query(`DELETE FROM "users" WHERE "id"=$1;`, [req.params.id])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      console.log("there was an error on the delete query", error);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const community_id = req.body.community;

  const queryText = 'INSERT INTO "users" (username, password, email, community_id) VALUES ($1, $2, $3, $4) RETURNING id';

  pool.query(queryText, [username, password, email, community_id])

    .then(() => res.sendStatus(201))
    .catch((error) => {
      res.sendStatus(500)
      console.log('error registering', error);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
