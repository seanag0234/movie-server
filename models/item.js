const mongoose = require('mongoose');


let itemSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        type: {
            type: String,
            trim: true,
            required: true
        },
        category: {
            type: String,
            required: false
        },
        medium: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = {
    Item: mongoose.model('item', itemSchema)
};
