const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return console.error(err);
        }
        res.send(users);
    });
});

router.post('/', function (req, res, next) {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    let password = body.password;
    if (!name || !email ||!password) {
        res.status(400).send({message: 'name, email, and password required'});
        return;
    }
    let newUser = new User();
    newUser.name = name;
    newUser.email = email;
    bcrypt.hash(password, 10).then(function(hash) {
        newUser.hashPassword = hash;
        newUser.save().then(function(user) {
            res.status(201).send({
                name: user.name,
                email: user.email,
                id: user._id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        }).catch(function(err) {
            console.error.bind("ERROR ", err);
            if (err.code === 11000) {
                res.status(400).send({message: `User with email ${email} already exists.`});
            } else {
                res.status(500).send(err);
            }
        })
    }).catch(function (err) {
        next(err);
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

router.delete('/:userId', function (req, res) {
    let userId = req.params.userId;
    User.remove({'_id': userId}).then(function(res) {
        res.send(`Deleted User: ${userId}`);
    }).catch(function(err) {
        res.status = 500;
        res.send(err);
    })

});


module.exports = router;
