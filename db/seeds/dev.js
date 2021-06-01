// Created using the command: "knex seed:make dev --knexfile ./db/knexfile.js" the dev.js file within our seeds/ directory
// Actually inputs the data into our already existing tables.


exports.seed = async function(knex) {
  // truncate all existing tables
  await knex.raw('ALTER TABLE "user" DROP CONSTRAINT "user_channelid_foreign"'); // I had to add this regardless of the CASCADE feature below.  productioncoder claims that the CASCADE syntax is necessary to avoid throwing an error due to foreign-key constraints, but this was still necessary.
  await knex.raw('TRUNCATE TABLE "user" CASCADE');
  await knex.raw('TRUNCATE TABLE "channel" CASCADE');
  await knex.raw('TRUNCATE TABLE "video" CASCADE');

  
  await knex('channel').insert([ // await's the migrationfile_init.js channel TABLE, and then insert's the following:
    {
      id: 1,
      name: "channel1"
    },
    {
      id: 2,
      name: "channel2"
    }
  ]);

  await knex('user').insert([
    {
      id: 1,
      name: "user1",
      email: "user1@test.com",
      channelId: 1
    },
    {
      id: 2,
      name: "user2",
      email: "user2@test.com",
      channelId: 2
    },
    {
      id: 3,
      name: "user3",
      email: "user3@test.com"
    }
  ]);

  return knex('video').insert([{  // Note that this last one is not an async function, but rather returns the value of the insert function as it's last synchronous function
    id: 1,
    title: "video1ByUser1",
    channelId: 1
  },
  {
    id: 2,
    title: "video2ByUser1",
    channelId: 1
  },
  {
    id: 3,
    title: "video3ByUser3",
    channelId: 2
  }
  ])
};
