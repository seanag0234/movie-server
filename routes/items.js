const itemRepo = require('../db/itemRepo');
const Item = require('../models/item').Item;

let getUsersItems = async function(req, res) {
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = req.params.userId;
    try {
        let items = await itemRepo.findByUserId(userId);
        let itemsArray = [];
        items.forEach(row => {
            itemsArray.push(Item.getFromRow(row))
        });
        return res.send(itemsArray);
    } catch (e) {
        console.log(e);
        return res.status(404).send(`User with id ${userId} not found`);
    }
};

let addItemToUser = async function(req, res) {
    if (!req.params.userId) {
        return res.status(400).send("userId param required")
    }
    const userId = parseInt(req.params.userId);
    if (req.user.id !== userId) {
        return res.status(401).send();
    }
    let body = req.body;
    let title = body.title;
    let type = body.type;
    let category = body.category ? body.category : 'General';
    let author = body.author ? body.author : '';
    let medium = body.medium;
    let status = body.status;
    if (!title || !type ||!medium || !status) {
        return res.status(400).send({message: 'title, type, status, and medium are required'});
    }
    if (!itemRepo.isValidType(type)) {
        return res.status(400).send({message: `${type} is not a valid type`});
    }
    if (!itemRepo.isValidMedium(type, medium)) {
        return res.status(400).send({message: `${medium} is not a valid medium`});
    }
    try {
        let itemId = await itemRepo.create(title, type, medium, userId, status, category, author);
        let itemRow = await itemRepo.findById(itemId);
        let item = Item.getFromRow(itemRow);
        return res.status(201).send({item: item});
    } catch (e) {
        console.log(e);
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
        let owned = await userOwnsItem(req.user.id, itemId);
        if (!owned) {
            return res.status(401).send();
        }
        let newItem = req.body.item;
        if (!itemRepo.isValidType(newItem.type) ) {
            return res.status(400).send({message: 'Not a valid type'});
        }

        if (!itemRepo.isValidMedium(newItem.type, newItem.medium)) {
            return res.status(400).send({message: 'Not a valid medium'});

        }
        await itemRepo.update(itemId, req.body.item);
        let itemRow = await itemRepo.findById(itemId);
        let item = Item.getFromRow(itemRow);
        return res.status(200).send({item: item});
    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }

};

async function userOwnsItem(userId, itemId) {
    let itemRow = await itemRepo.findById(itemId);
    let item = Item.getFromRow(itemRow);
    return item.userId === parseInt(userId);
}

let deleteById = async function (req, res) {
    let userId = req.params.userId;
    let itemId = req.params.itemId;
    if(!userId || !itemId) {
        return res.status(400).send({message: 'userId and itemId params required'})
    }
    try {
        let owned = await userOwnsItem(userId, itemId);
        if (!owned) {
            return res.status(401).send();
        }
        await itemRepo.deleteById(itemId);
        return res.status(204).send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

module.exports = {
    getUsersItems,
    addItemToUser,
    update,
    deleteById
};
