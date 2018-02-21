const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        hashPassword: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.hashPassword);
};

module.exports = {
    User: mongoose.model('User', userSchema)
};