// Update with your config settings.
// Note that this file is initially made within our home directory objection-tutorial/ and is created using 'npx knex init' in the CLI
// Once imported delete all except for the 'postgresql' client.

const {knexSnakeCaseMappers} = require('objection'); // ObjectionJS  will convert camelcase to snake case so that
// standard JS conventions are usable within knexJS context. (i.e. firstName becomes first_name).

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'objection_tutorial',
      user:     'postgres',
      password: null
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: { // seeds specifies where we store our initial data.
      directory: './seeds', //allows you to easily add more data or sample data into the DB 
    },
    ...knexSnakeCaseMappers // exports knexSnakeCaseMappers from ObjectionJS
  },
};