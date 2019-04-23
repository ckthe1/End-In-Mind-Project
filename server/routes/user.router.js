const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

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
      ON "users"."community_id" = "communities"."id";
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

  const propertyName = req.body.property.replace(/'/g, '"');

  console.log('our nice new propoerty is ', propertyName);

  pool
    .query(
      `UPDATE "users" SET $1 = $2 WHERE "id" = $3;`,

      [req.body.property, req.body.value, req.body.user.id]
    )
    .then(result => res.sendStatus(200))

    .catch(error => {
      console.log("error modifying user", error);
      res.sendStatus(500);
    });

})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO "users" (username, password, email) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, "name@domain.net"])
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
