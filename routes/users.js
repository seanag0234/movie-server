const express = require('express');
const router = express.Router();
const User = require('../models/user').User;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let users = await User.find();
        res.send(users);

    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:userId', async function(req, res, next){
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = req.params.userId;
    try {
        let query = User.findById(userId);
        let user = await query.exec();
        return res.send(user);
    } catch (e) {
        return res.status(404).send(`User with id ${userId} not found`);
    }
});

router.delete('/:userId', async function (req, res, next) {
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = req.params.userId;
    try {
       await User.remove({'_id': userId});
        res.send(`Deleted User: ${userId}`);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
