This is a following of productioncoder's tutorial on using knexJS and objectionJS to write a basic PostgreSQL database.
It creates a simple database with a users TABLE, a channels TABLE, and a videos TABLE.  For every user, there can be two channels, and within each channel there can be an unlimited number of videos.  The link for the video is:

https://www.youtube.com/watch?v=zbIl2kuP7tE

Let's Get Started:
Initially we're going to want to create a main directory called objection-tutorial.  Once created, enter the directory and initialize your node package manager:

npm init -yes

And install your dependencies:

npm i knex objection express pg

You should already have PostgreSQL running locally on your machine.  Within psql or pgadmin4, you should CREATE a DATABASE called objection_tutorial.

ALso we'll need nodemon:

npm i --save-dev nodemon (note the --save-dev parameter puts it as a dev dependency).

The Tutorial:

And create your index.js file (see notes for continuation).

And also create your db folder, with two subdirectories called migrations and seeds.

Within your main directory, run:

npx knex init

Which will create your knexfile.js file which has the configurations for sql based databases.

After working on the knexfile.js file.  Then we want to utilize this command from within our objection-tutorial/ directory:

npx knex migrate:make init

This will initialize knexJS's migrate feature, which creates a reallylongnumber_init.js file.  This should be moved to the db/migrations/ directory.

As you may recall from the productioncoder's knexJS tutorial, this creates a basic file from which we can start to lay out the essentials of our databse, it includes an exports.up function as well as an exports.down function where the basic mapping out of our TABLES can be done.

Once this is done, add the "migrate" command to the package-json scripts section and enter:

knex migrate:latest --knexfile ./db/knexfile.js

In as its value.  That way, we can just run npm run migrate, which will pass the migrations, reallylongnumber_init.js file, to the knexfile.js which will create our tables within our objection_tutorial db schema.

After this you can test to see if it will create your tables by running:

npm run migrate

And check either psql or pgadmin4 to see if it created your tables.  Once you have done so and confirmed that the tables have been created, you can now starte creating your seed data within your seeds directory.  You can now create another scripts within your package.json file:

"make-seed": "npx knex seed:make dev --knexfile ./db/knexfile.js"

And run:

npm run make-seed

Which creates a dev.js file within your seeds directory.  This dev.js file will allow you to add data to your tables.

Once you have edited the file to insert some test data, write another script:

"seed": "npx knex seed:run --knexfile ./db/knexfile.js"

And test with:

npm run seed

Then once again check your DB via psql or via pgadmin4, and you should see your data inside the tables.

And add another script:

"down": "npx knex migrate:down --knexfile ./db/knexfile.js"

This will undo the last migration if for whatever reason you don't wish to update the DB with the latest data.

Next we will need to create our model classes, which is anotoher ObjectionJS feature.  Within our db directory create a models subdirectory.  WIthin this directory, we are going to create channel.js, user.js, and video.js files.

Also, within our db directory we are going to need to create another file, called db-setup.js
Within this db-setup.js file, the database itself is setup by reading the knexfile.js's development key and importing the PostgreSQL key/value pairs, and passing that to the Model class from objectionJS.  This is enclosed in a function called dbSetup, which is exported to the index.js file.

It is called within the index.js file which uses expressJS's asynchronous function app.get to start the server, query the database, and return the user data with the id the $USER specifies ( "app.get('/user/:id')" ) in a JSON format.

Lastly we wish to utilize knexJS's relationMappings method to create relations between our different models files. Note the "static get" syntax in the file.  Finally we add a withGraphFetched method to our user variable, which will add our 'channel' data to our user file, allowing us to also view the channel data attached to the User by that same channelID.  Note that productioncoder points out that this is expensive in terms of resources especially when dealing with large amounts of data and you would not necessarily want to do this every time.

Summary:
objectionJS and knexJS are useful tools for creating, appending, and editing databases and their respective data.  ObjectionJS allows a very easy way for data from different tables within the database to reference each other and thereby easily/lazily associate and thereby change the data within each other.  The applications for this can range from simple editing to sharing of, in this case, video files from one database table to another.  I am particularly fond of the knex.raw syntax in the seeds/dev.js file as it allows for the passing of raw SQL syntax into nodeJS.  This is more a function of the passed pg module, but is nevertheless very useful.

It is probably time to integrate some of this info into our TODO list application, but the proper working method for this is still particularly elusive to me at the time of this writing, which is why this README has extensively documented the process of which files/directories were created in which order and why.  Hopefully this will help in the development of future projects.
