exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('items', function(table) {
            table.increments('id').primary();
            table.timestamps(false, true);
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
            table.string('title');
            table.string('type');
            table.string('category');
            table.string('medium');
            table.string('status');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('items'),
    ]);
};
