const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', async function (req, res) {
    let body = req.body;
    let password = body.password;
    let email = body.email;
    if (!password || !email) {
        return res.status(400).send({message: 'email and password fields required.'});
    }
    let failureMessage = {message: 'Authentication failed.'};
    try {
        let search = {email: email};
        let user = await User.findOne(search);
        if (!user) {
            return res.status(401).send(failureMessage)
        }
        let passwordsMatch = await user.comparePassword(password);
        if (!passwordsMatch) {
            return res.status(401).send(failureMessage)
        }
        let signingOptions = {
            algorithm: 'HS512'
        };
        return res.json({token: jwt.sign({ email: user.email, name: user.name, _id: user._id}, config.getSecret(), signingOptions)});

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/register', async function (req, res, next) {
    let body = req.body;
    let name = body.name;
    let email = body.email;
    let password = body.password;
    if (!name || !email ||!password) {
        res.status(400).send({message: 'name, email, and password required'});
        return;
    } else if(password.length < 5) {
        res.status(400).send({message: 'Password needs to be at least 5 characters long.'})
    }
    try {
        let newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.hashPassword = await bcrypt.hash(password, 10)
        let user = await newUser.save();

        res.status(201).send({
            name: user.name,
            email: user.email,
            id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (e) {
        if (e.code === 11000) {
            res.status(400).send({message: `User with email ${email} already exists.`});
        } else {
            res.status(500).send();
        }
    }
});

module.exports = router;
