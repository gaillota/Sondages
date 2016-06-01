/**
 * Check is user is logged in
 */
checkUser = function() {
    if (!Meteor.userId()) {
        throw new Meteor.Error(403, 'You must be logged in to continue.');
    }
};

checkModerator = function() {
    checkUser();

    if (!Roles.userIsInRole(Meteor.userId(), 'moderator')) {
        throw new Meteor.Error(403, 'You must be moderator to continue.');
    }
};

/**
 * Check if user is logged in and is admin
 */
checkAdmin = function() {
    checkUser();

    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        throw new Meteor.Error(403, 'You must be admin to continue.');
    }
};
