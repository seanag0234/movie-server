const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) {
            res.status(500).send();
        }
        res.send(users);
    });
});

router.get('/:userId', function(req, res, next){
    const userId = req.params.userId;
    let query = User.findById(userId);
    query.exec().then(function(user) {
        res.send(user);
    }).catch(function(err) {
        res.status(404).send(`User not found ${userId}.`);
    })

});

router.delete('/:userId', function (req, res, next) {
    let userId = req.params.userId;
    User.remove({'_id': userId}).then(function() {
        res.send(`Deleted User: ${userId}`);
    }).catch(function(err) {
        res.status(500).send();
    })

});

module.exports = router;
