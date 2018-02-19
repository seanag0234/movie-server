const mongoose =require('mongoose');

let db = null;

module.exports = {

    connectToServer: function( callback ) {
        mongoose.connect('mongodb://mongo');
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {});
    },

    getDb: function() {
        return db;
    }
};