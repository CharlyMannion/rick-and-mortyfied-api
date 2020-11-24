exports.up = function(knex) {
    console.log('creating locations table');
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
    console.log('dropping locations table');
    return knex.schema.dropTable('locations');
};