const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res) {
    if (!req.body.password || !req.body.email) {
        return res.status(400).send({message: 'email and password fields required.'});
    }
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed.' });
        } else if (user) {
            user.comparePassword(req.body.password).then(function(isCorrect){
                if (!isCorrect) {
                    res.status(401).json({ message: 'Authentication failed.' });
                } else {
                    let signingOptions = {
                        algorithm: 'HS512',
                        expiresIn: '8hr'
                    };
                    return res.json({token: jwt.sign({ email: user.email, name: user.name, _id: user._id}, config.getSecret(), signingOptions)});
                }

            }).catch(function (err) {
                return res.status(500).json({ message: 'Failed in checking password.'});
            });
        }
    });
});

module.exports = router;
