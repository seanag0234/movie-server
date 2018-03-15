const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userRepo = require('../db/userRepo');
const itemRepo = require('../db/itemRepo');
const auth = require('../middleware/auth');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

function signToken(user) {
    let signingOptions = {
        algorithm: 'HS512'
    };
    return jwt.sign({ email: user.email, name: user.name, _id: user._id, type: user.type}, config.getSecret(), signingOptions);
}

router.post('/login', async function (req, res) {
    let body = req.body;
    let password = body.password;
    let email = body.email;
    if (!password || !email) {
        return res.status(400).send({message: 'email and password fields required.'});
    }
    let failureMessage = {message: 'Username or password did not match'};
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
        let token = signToken(user);
        user.hashPassword = undefined;
        return res.json({token: token, user: user});

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
        return res.status(400).send({message: 'name, email, and password required'});
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
        let user = await auth.verifyToken(token);
        let items = await itemRepo.findByUserId(user._id);
        let movies = items.filter((i) => {
            return i.type === 'movie';
        });
        let books = items.filter((i) => {
            return i.type === 'book';
        });
        user.movies = movies;
        user.books = books;
        res.status(200).send({user: user});
    } catch (e) {
        res.status(401).send();
    }
});

module.exports = router;
