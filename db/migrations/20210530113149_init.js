// Once again, exports.up function with the knex argument is created along with exports.down function with the knex argument.
// A lot of the following syntax is more or less self explanatory.


exports.up = function(knex) {
    return knex.schema // the initial method that references which database SCHEMA we're working within, this parameter is passed from our knexfile.js database key.
    .createTable('channel', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.timestamps(true, true); // creates a created_at and updated_at columns
    })
    .createTable('user', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.integer('channelId').references('id').inTable('channel'); // our first foreign ID, which ended up needing to be addressed later
        table.timestamps(true, true);
    })
    .createTable('video', (table) => {
        table.increments();
        table.string('title').notNullable();
        table // another foreign ID
        .integer('channelId')
        .notNullable()
        .references('id')
        .inTable('channel');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) { // if any of the tables within the specified schema already exist, then DROP that TABLE so we don't create another one every time we run this program.
    return knex.schema
    .dropTableIfExists('video') 
    .dropTableIfExists('user')
    .dropTableIfExists('channel');
};
