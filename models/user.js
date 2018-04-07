const bcrypt = require('bcrypt');

class User {
    constructor(name, email, hashPassword, type, updatedAt='', createdAt='') {
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

}

module.exports = {
    User: User
};