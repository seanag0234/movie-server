const express = require('express');
const router = express.Router();
// const mongodb = require('../db/mongodb');
const mongoose = require('mongoose');
// let db = mongodb.getDb();

let userSchema = mongoose.Schema({
    name: String,
    email: String
});

let User = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return console.error(err);
        }
        console.log(users);
        res.send(users);
    });
});

router.post('/', function (req, res, next) {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    if (!name || !email) {
        res.status(400).send('name and email required');
        return;
    }
    let newUser = new User();
    newUser.name = name;
    newUser.email = email;
    console.log('new user ', newUser.name);
    newUser.save().then(function(user) {
        console.log(`saved user ${user}`);
        res.send(`Saved User ${user}`);

    }).catch(function(err) {
        console.error.bind("ERROR ", err);
        res.send(`Error Saving User ${err}`);
    })
});

router.get('/:userId', function(req, res, next){
    const userId = req.params.userId;
    console.log(`UserId ${userId}`);
    let query = User.findById(userId);
    // query.select('*');
    query.exec().then(function(user) {
        console.log(`User Found ${user}`);
        console.log(user.name);
        res.send(user);
    }).catch(function(err) {
        res.status(404).send(`User not found ${userId}.`);
    })

});

router.delete('/:userId', function (req, res) {
    let userId = req.params.userId;
    console.log("Userid ", userId);
    User.remove({'_id': userId}).then(function(res) {
        console.log(res);
        res.send(`Deleted User: ${userId}`);
    }).catch(function(err) {
        res.status = 500;
        res.send(err);
    })

});


module.exports = router;
