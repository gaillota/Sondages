// Bootstrap route
Router.route('/boot', function() {
    this.response.end(Meteor.call('bootstrap'));
}, {
    where: 'server'
});

Meteor.methods({
    // Method for bootstrapping application (create first user and set it as admin)
    bootstrap: function() {
        if (!Meteor.users.find().count()) {
            var username = Meteor.settings.admin.username;
            var emailAddress = Meteor.settings.admin.emailAddress;
            var password = Meteor.settings.admin.password;

            if (!username || !emailAddress || !password) {
                return 'Please fill in the settings.json file';
            }

            var options = {
                username: username,
                email: emailAddress,
                password: password,
                profile: {
                    firstName: 'admin',
                    lastName: 'admin'
                }
            };

            var newUserId = Accounts.createUser(options);
            Roles.addUsersToRoles(newUserId, 'admin moderator speaker'.split(' '));
            Meteor.users.update(newUserId, {
                $set: {
                    "emails.0.verified": true
                }
            });

            return 'First user successfully created !';
        } else {
            return 'App already booted';
        }
    }
});