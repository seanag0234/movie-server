const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userRepo = require('../db/userRepo');
const auth = require('../middleware/auth');
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

function signToken(user) {
    let signingOptions = {
        algorithm: 'HS512'
    };
    return jwt.sign({ email: user.email, name: user.name, _id: user._id}, config.getSecret(), signingOptions);
}

router.post('/login', async function (req, res) {
    let body = req.body;
    let password = body.password;
    let email = body.email;
    if (!password || !email) {
        return res.status(400).send({message: 'email and password fields required.'});
    }
    let failureMessage = {message: 'Authentication failed.'};
    try {
        let query = userRepo.findByEmail(email);
        let user = await query;
        if (!user) {
            return res.status(401).send(failureMessage)
        }
        let passwordsMatch = await user.comparePassword(password);
        if (!passwordsMatch) {
            return res.status(401).send(failureMessage)
        }
        return res.json({token: signToken(user)});

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
        let user = await userRepo.createUser(name, email, password);
        user.hashPassword = undefined;
        res.status(201).send({
            'user': user,
            'token': signToken(user)
        });
    } catch (e) {
        console.log(e);
        if (e.code === 11000) {
            res.status(400).send({message: `User with email ${email} already exists.`});
        } else {
            res.status(500).send();
        }
    }
});

router.post('/verify-token', async function (req, res) {
    try {
        let token  = req.body.token;
        await auth.verifyToken(token);
        res.status(200).send();
    } catch (e) {
        res.status(401).send();
    }
});

module.exports = router;
