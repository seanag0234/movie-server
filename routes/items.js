const express = require('express');
const router = express.Router();
const itemRepo = require('../db/itemRepo');

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//     try {
//         let users = await userRepo.getAllUsersWithoutPassword();
//         res.send(users);
//
//     } catch (e) {
//         res.status(500).send();
//     }
// });

router.get('/', async function(req, res, next){
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = req.params.userId;
    try {
        let items = await itemRepo.findByUserId(userId);
        console.log("items");
        console.log(items);
        return res.send(items);
    } catch (e) {
        console.log(e);
        return res.status(404).send(`User with id ${userId} not found`);
    }
});

// router.delete('/:userId', async function (req, res, next) {
//     if (!req.params.userId) {
//         return res.status(400).send("userId param required")
//     }
//     const userId = req.params.userId;
//     try {
//         await userRepo.deleteUserById(userId);
//         res.send(`Deleted User: ${userId}`);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

module.exports = router;
