const {Model} = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        const Channel = require('./channel'); // note the importing of our channell.js within a function!  This is to ensure there are not "circular import paths." which I assume would create a problem of infinite recursion...
        return {
            channel: {
                relation: Model.HasOneRelation,
                modelClass: Channel,
                join: {
                    from: 'user.channelId', // note the reference to the user.channelID value,
                    to: 'channel.id' //  which we are joining to the channel.id value.
                },
            },
        };
    }
}

module.exports = User;