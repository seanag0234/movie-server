const Item = require('../models/item').Item;

function findByUserId(id) {
    try {
        let search = {user_id: id};
        return Item.find(search)
    } catch (e) {
        throw e;
    }
}

function create(title, type, category, medium, userId) {
    try {
        let newItem = new Item();
        newItem.title = title;
        newItem.type = type;
        newItem.category = category;
        newItem.medium = medium;
        newItem.userId = userId;
        return newItem.save();
    } catch (e) {
        throw e;
    }
}

module.exports = {
    findByUserId,
    create
};

