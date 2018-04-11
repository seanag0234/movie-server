const express = require('express');
const router = express.Router();
const userRepo = require('../db/userRepo');
const itemsRepo = require('../db/itemRepo');
const items = require('../routes/items');
const User = require('../models/user').User;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let userRows = await userRepo.getAllUsersWithoutPassword();
        let users = [];
        userRows.forEach(row => {
            users.push(User.getFromRow(row));
        });
        res.send({users: users});
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/:userId', async function(req, res, next){
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = req.params.userId;
    try {
        let userQuery =  userRepo.findByIdWithoutPassword(userId);
        let itemsQuery =  itemsRepo.findByUserId(userId);
        let userRow = await userQuery;
        let user = User.getFromRow(userRow);
        let items = await itemsQuery;
        return res.send({user: user, items: items});
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

router.put('/:userId', async function (req, res) {
    try {
        let body = req.body;
        let name = body.name;
        let email = body.email;
        let id = body.id;

        if (!name || !email || !id) {
            return res.status(400).send('name, email, and id parameters required')
        }

        if (req.user.id !== id) {
            res.status(401).send();
        }

        let updated = await userRepo.update(id, name, email);
        updated ? res.status(200).send() : res.status(500).send();
    }
    catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/:userId/items', async function(req, res, next){
    return items.getUsersItems(req, res);
});

router.post('/:userId/items', function (req, res) {
    return items.addItemToUser(req, res);
});

router.put('/:userId/items/:itemId', function (req, res) {
    return items.update(req, res);
});

router.delete('/:userId/items/:itemId', function (req, res) {
  return items.deleteById(req, res);
});

module.exports = router;
