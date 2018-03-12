const itemRepo = require('../db/itemRepo');

let getUsersItems = async function(req, res) {
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = req.params.userId;
    try {
        let items = await itemRepo.findByUserId(userId);
        console.log(userId);
        return res.send(items);
    } catch (e) {
        console.log(e);
        return res.status(404).send(`User with id ${userId} not found`);
    }
};

let addItemToUser = async function(req, res) {
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    let body = req.body;
    let title = body.title;
    let type = body.type;
    let category = body.category;
    let medium = body.medium;
    if (!title || !type ||!medium) {
        return res.status(400).send({message: 'title, type, and medium are required'});
    }
    if (!itemRepo.isValidType(type)) {
        return res.status(400).send({message: `${type} is not a valid type`});
    }
    if (!itemRepo.isValidMedium(type, medium)) {
        return res.status(400).send({message: `${medium} is not a valid medium`});
    }
    const userId = req.params.userId;
    try {
        let item = await itemRepo.create(title, type, medium, userId, category);
        return res.status(201).send(item);
    } catch (e) {
        return res.status(404).send(`User with id ${userId} not found`);
    }
};

let update = async function(req, res) {
    let userId = req.params.userId;
    let itemId = req.params.itemId;
    if(!userId || !itemId) {
        return res.status(400).send({message: 'userId and itemId params required'})
    }
    try {
        let newItem = req.body.item;
        console.log(newItem.medium);
        if (!itemRepo.isValidType(newItem.type) ) {
            return res.status(400).send({message: 'Not a valid type'});
        }

        if (!itemRepo.isValidMedium(newItem.type, newItem.medium)) {
            return res.status(400).send({message: 'Not a valid medium'});

        }
        let item = await itemRepo.update(itemId, req.body.item);
        return res.status(200).send(item);
    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }

};

module.exports = {
    getUsersItems,
    addItemToUser,
    update
};
