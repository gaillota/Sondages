Meteor.methods({
    enrollUser: function(doc) {
        checkAdmin();

        var options = _.pick(doc, 'username email'.split(' '));
        options.password = doc.username;
        options.profile = _.pick(doc, 'firstName lastName'.split(' '));
        
        var newUserId = Accounts.createUser(options);
        if (doc.roles && doc.roles.length > 0) {
            Roles.addUsersToRoles(newUserId, rolesGuessing[doc.roles]);
        }
        
        Meteor.users.update(newUserId, {
            $set: {
                "emails.0.verified": true
            }
        });

        return newUserId;
    }
});

var rolesGuessing = {
    "speaker" : 'speaker'.split(' '),
    "moderator" : 'speaker moderator'.split(' '),
    "admin" : 'speaker moderator admin'.split(' ')
};