const dbSetup = require('./db/db-setup'); // calls upon the db-setup.js file which uses knexJS and objectionJS to call upon our DB parameters from our knexfile.js

const express = require('express');
const User = require('./db/models/user');

dbSetup(); // actually calls the dbSetup here.

const app = express();
app.use(express.json());

// in prod put this in separate files to avoid code smells, this is technically an example of a code smell...
//this is just for the tutorial, normally you would also need to build a service layer and error handling and request validation as well.
app.get('/user/:id', async (req, res, next) => {
    try { // notice that try/catch is just error handling..
        const { id } = req.params; // destruct's the id from the requested parameters and puts it in a variable called id.
        const user = await User.query().findById(id).withGraphFetched('channel'); // queries the imported User, found by the destructed id, and withGraphedFetched also loads the 'channel' key/value from the static get relationMappings function from the objectionJS's Model class.
        res.json(user); // return the resolved JSON returned from the user.
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

app.listen(8080, () => console.log('server running on port 8080'));