const mongoose =require('mongoose');

let db = null;

module.exports = {

    connectToServer: function( callback ) {
        mongoose.connect('mongodb://mongo').then(function () {
            console.info.bind("Connected to mongo");
        }).catch(function (err) {
            console.error.bind(err);
        });
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {});
    },

    getDb: function() {
        return db;
    }
};