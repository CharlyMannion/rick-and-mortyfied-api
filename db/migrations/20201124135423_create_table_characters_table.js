exports.up = function(knex) {
    console.log('creating characters table');
    return knex.schema.createTable('characters', (charactersTable) => {
        charactersTable.increments('character_id').primary();
        charactersTable.string('name').notNullable();
        charactersTable.string('status').notNullable();
        charactersTable.string('species').notNullable();
        charactersTable.string('type').notNullable();
        charactersTable.string('gender').notNullable();
        charactersTable.string('origin').references('locations.name').notNullable();
        charactersTable.string('location').references('locations.name').notNullable();
        charactersTable.string('image').notNullable();
        charactersTable.string('ur;').notNullable();
        charactersTable.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    console.log('dropping characters table');
    return knex.schema.dropTable('characters');
};