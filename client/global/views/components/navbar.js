Template.navbar.events({
    'click .js-logout': function(e) {
        e.preventDefault();

        Meteor.logout(function(error) {
            if (error) {
                console.log(error);
                throwAlert(error.reason);
            }
        });
    }
});