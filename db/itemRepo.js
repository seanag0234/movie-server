const Item = require('../models/item').Item;

const acceptedTypes = [
    'movie',
    'book'
];

const validMediums = {
    'movie': [
        'dvd',
        'bluRay'
    ]
};

function isValidType(type) {
    return acceptedTypes.includes(type);
}

function isValidMedium(type, medium) {
    return validMediums[type] && validMediums[type].includes(medium);
}

function findByUserId(id) {
    try {
        let search = {userId: id};
        return Item.find(search);
    } catch (e) {
        throw e;
    }
}

function create(title, type, medium, userId, category='General') {
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
    create,
    isValidType,
    isValidMedium
};

