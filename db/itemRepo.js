const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

const ITEMS_TABLE = 'items';

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
        return knex(ITEMS_TABLE).where('user_id', id);
    } catch (e) {
        throw e;
    }
}

function findById(id) {
    try {
        return knex(ITEMS_TABLE).where('id', id);
    } catch (e) {
        throw e;
    }
}


function deleteById(id) {
    try {
        return knex(ITEMS_TABLE).where('id', id).del();
    } catch (e) {
        throw e;
    }
}

async function update(id, item) {
    try {
        return knex(ITEMS_TABLE).where('id', id)
            .update({
                title: item.title,
                type: item.type,
                category: item.category,
                medium: item.medium,
                user_id: item.userId,
                status: item.status,
                // updated_at: Date.now()
            });
    } catch (e) {
        throw e;
    }
}

function create(title, type, medium, userId, status, category='General') {
    try {
        let now = Date.now();
        return knex(ITEMS_TABLE)
            .insert({
                title: title,
                type: type,
                medium: medium,
                user_id: userId,
                status: status,
                category: category,
                // created_at: now,
                // updated_at: now
            })
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

