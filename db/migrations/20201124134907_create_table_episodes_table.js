exports.up = function(knex) {
    return knex.schema.createTable('episodes', (episodesTable) => {
        episodesTable.increments('episode_id').primary();
        episodesTable.integer('number').defaultTo(0);
        episodesTable.string('name').notNullable();
        episodesTable.string('air_date').notNullable();
        episodesTable.string('episode').notNullable();
        episodesTable.string('url').notNullable();
        episodesTable.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('episodes');
};