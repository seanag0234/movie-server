
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('items', function(table) {
            table.string('author').defaultsTo('');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('items', function(table) {
            table.dropColumn('author');
        }),
    ]);
};
