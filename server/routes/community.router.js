const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

  console.log('getting communities...');
  pool.query(`SELECT * FROM "communities" ORDER BY "id"`)

  .then (response => {
    res.send(response.rows);
  })

  .catch(error => {
    console.log('error getting events!', error);
    res.sendStatus(500);
  })
});

module.exports = router;