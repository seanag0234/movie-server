const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const userRepo = require('../db/userRepo');
const itemRepo = require('../db/itemRepo');
const auth = require('../middleware/auth');
const User = require('../models/user').User;
const Item = require('../models/item').Item;

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

function signToken(user) {
    let signingOptions = {
        algorithm: 'HS512'
    };
    return jwt.sign({ email: user.email, name: user.name, id: user.id, type: user.type}, config.getSecret(), signingOptions);
}

async function addUserItems(user) {
    let itemRows = await itemRepo.findByUserId(user.id);
    let books = [];
    let movies = [];
    itemRows.forEach(i => {
        if (i.type === 'movie') {
            movies.push(i);
        } else if (i.type === 'book') {
            books.push(i);
        }
    });

    user.books = books;
    user.movies = movies;
}

router.post('/login', async function (req, res) {
    let body = req.body;
    let password = body.password;
    let email = body.email;
    if (!password || !email) {
        return res.status(400).send({message: 'email and password fields required.'});
    }
    let failureMessage = {message: 'Username or password did not match a user'};
    try {
        let query = userRepo.findByEmail(email);
        let userRow = await query;
        let user = userRow ? User.getFromRow(userRow) : undefined;
        let userItemPromise =  addUserItems(user);
        if (!user) {
            return res.status(401).send(failureMessage)
        }
        let passwordsMatch = await user.comparePassword(password);
        if (!passwordsMatch) {
            return res.status(401).send(failureMessage)
        }
        let token = signToken(user);
        await userItemPromise;
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
        let userId = await userRepo.createUser(name, email, password);
        let user = await userRepo.findById(userId);
        user.hashPassword = undefined;
        res.status(201).send({
            'user': user,
            'token': signToken(user)
        });
    } catch (e) {
        if (e.errno === 1062) {
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
        let userRow = await userRepo.findById(user.id);
        user = User.getFromRow(userRow);
        let itemsRows = await itemRepo.findByUserId(user.id);
        let items = [];
        itemsRows.forEach(item => {
            items.push(Item.getFromRow(item));
        });
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
