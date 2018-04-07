const Item = require('../models/item').Item;

const acceptedTypes = [
    'movie',
    'book'
];

const validMediums = {
    'movie': [
        'dvd',
        'bluRay'
    ],
    'book': [
        'paperback',
        'hardcover'
    ]
};

function isValidType(type) {
    return acceptedTypes.includes(type);
}

function isValidMedium(type, medium) {
    console.log(medium);
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

function findById(id) {
    try {
        return Item.findById(id);
    } catch (e) {
        throw e;
    }
}


function deleteById(id) {
    try {
        return Item.remove({'_id': id});
    } catch (e) {
        throw e;
    }
}

async function update(id, item) {
    try {
        let oldItem = await Item.findById(id);
        await oldItem.set(item);
        return oldItem.save();

    } catch (e) {
        throw e;
    }
}

function create(title, type, medium, userId, status, category='General') {
    try {
        let newItem = new Item();
        newItem.title = title;
        newItem.type = type;
        newItem.category = category;
        newItem.medium = medium;
        newItem.userId = userId;
        newItem.status = status;
        return newItem.save();
    } catch (e) {
        throw e;
    }
}

module.exports = {
    findByUserId,
    create,
    isValidType,
    isValidMedium,
    deleteById,
    update,
    findById

};

