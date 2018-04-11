const bcrypt = require('bcrypt');

class User {
    constructor(id, name, email, hashPassword, type, updatedAt='', createdAt='') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.hashPassword = hashPassword;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    comparePassword (password) {
        return bcrypt.compare(password, this.hashPassword);
    }

    static getFromRow(row) {
        let user = new User();
        user.id = row.id;
        user.email = row.email;
        user.name = row.name;
        user.type = row.type;
        if (row.hash_password) {
            user.hashPassword = row.hash_password;
        }
        user.createdAt = row.created_at;
        user.updatedAt = row.updated_at;
        return user;
    }
}

module.exports = {
    User: User
};