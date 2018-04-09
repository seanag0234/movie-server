exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('email').unique().notNullable();
            table.string('hash_password').notNullable();
            table.string('name');
            table.string('type');
            table.timestamps(false, true);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
    ]);
};
