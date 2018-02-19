const express = require('express');
const router = express.Router();
const mongodb = require('../db/mongodb');

let db = mongodb.getDb();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({"test": [1]});
});

module.exports = router;
