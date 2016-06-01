/**
 * Helper for local alert collection
 * 
 * @param text
 * @param type
 * @param icon
 */
throwAlert = function(text, type, icon) {
    text = text || 'Une erreur est survenue.';
    type = type || 'danger';

    var alert = {
        type: type,
        text: text,
        icon: icon
    };

    var alertId = Alerts.insert(alert);

    Meteor.setTimeout(function() {
        Alerts.remove(alertId);
    }, 3500);
};

/**
 * Check if user has specified role
 *
 * @param userId
 * @param role
 * @returns {*|Boolean}
 */
hasRole = function(role, userId) {
    userId = userId || Meteor.userId();
    return Roles.userIsInRole(userId, role);
};
