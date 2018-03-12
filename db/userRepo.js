const User = require('../models/user').User;
const bcrypt = require('bcrypt');


async function findByIdWithoutPassword(id) {
    try {
        let query = User.findById(id);
        query.select('-hashPassword');
        return await query.exec();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function createUser(name, email, password) {
   try {
       let newUser = new User();
       newUser.name = name;
       newUser.email = email;
       newUser.hashPassword = await bcrypt.hash(password, 10);
       return await newUser.save();
   } catch (e) {
       throw e;
   }
}

async function findByEmail(email) {
    try {
        let search = {email: email};
        return await User.findOne(search)
    } catch (e) {
        throw e;
    }
}

async function getAllUsersWithoutPassword() {
    try {
        let query = User.find();
        query.select('-hashPassword');
        return await query.exec();
    } catch (e) {
        throw e;
    }
}

async function deleteUserById(id) {
   try {
       return await User.remove({'_id': id});
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