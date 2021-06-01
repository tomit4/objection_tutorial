const knex = require('knex');
const knexfile = require('./knexfile');
const {Model} = require ('objection');
// Gives knex instance to the database
function setupDb() {
    const db = knex(knexfile.development); // passes the instance of our database to knex
    Model.knex(db); //and uses ObjectionJS Model class to call upon that database 
}

module.exports = setupDb;