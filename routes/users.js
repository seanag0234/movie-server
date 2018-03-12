const express = require('express');
const router = express.Router();
const userRepo = require('../db/userRepo');
const items = require('../routes/items');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let users = await userRepo.getAllUsersWithoutPassword();
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
        let user = await userRepo.findByIdWithoutPassword(userId);
        console.log("USER IS ", user);
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
       await userRepo.deleteUserById(userId);
        res.send(`Deleted User: ${userId}`);
    } catch (e) {
        res.status(500).send();
    }
});
router.get('/:userId/items', async function(req, res, next){
    return items.getUsersItems(req, res);
});

router.post('/:userId/items', function (req, res) {
    return items.addItemToUser(req, res);
});

module.exports = router;
