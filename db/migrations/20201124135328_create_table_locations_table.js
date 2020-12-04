exports.up = function(knex) {
    return knex.schema.createTable('locations', (locationsTable) => {
        locationsTable.increments('location_id').primary();
        locationsTable.string('name').notNullable().unique();
        locationsTable.string('type').notNullable();
        locationsTable.string('dimension').notNullable();
        locationsTable.string('url').notNullable();
        locationsTable.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('locations');
};