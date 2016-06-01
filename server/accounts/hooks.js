// Validate user login attempt and update lastConnectionAt field
Accounts.validateLoginAttempt(function (req) {
    // If no user in request
    if (!req.user) {
        return false;
    }

    // If user has been disabled
    if (req.user.disabled) {
        throw new Meteor.Error(403, "Votre compte a été désactivé");
    }

    // Update lastConnectionAt field
    Meteor.users.update({
        _id: req.user._id
    }, {
        $set: {
            lastConnectionAt: new Date()
        }
    });

    return true;
});