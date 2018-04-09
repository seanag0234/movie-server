const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

const USERS_TABLE = 'users';

async function findByIdWithoutPassword(id) {
    try {
        return knex(USERS_TABLE)
            .select(
                'id',
                'email',
                'name',
                'type',
                'created_at',
                'updated_at'
            ).where('id', id);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function createUser(name, email, password) {
   try {
       let hashPassword = await bcrypt.hash(password, 10);
       return knex(USERS_TABLE).insert({email: email, hash_password: hashPassword, name: name, type: 'user'});
   } catch (e) {
       throw e;
   }
}

async function findByEmail(email) {
    try {
        return knex(USERS_TABLE).where('email', email);
    } catch (e) {
        throw e;
    }
}

async function getAllUsersWithoutPassword() {
    try {
        console.log("HERE");
        console.log(knex);
        return knex(USERS_TABLE);
    } catch (e) {
        throw e;
    }
}

async function deleteUserById(id) {
   try {
       return knex(USERS_TABLE).where('id', id).del();
   } catch (e) {
       throw e;
   }

}


module.exports = {
    findByIdWithoutPassword,
    getAllUsersWithoutPassword,
    deleteUserById,
    findByEmail,
    createUser

};