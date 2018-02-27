const User = require('../models/user').User;


async function findByIdWithoutPassword(id) {
    try {
        let query = User.findById(id);
        query.select('-hashPassword');
        let user = await query.exec();
        return user;
    } catch (e) {
        throw e;
    }
}


module.exports = {
    findById: findByIdWithoutPassword

};