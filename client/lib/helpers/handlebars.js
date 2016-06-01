// Helper for font-awesome icons
Template.registerHelper('fa', function(icon) {
    return '<i class="fa fa-' + icon + '" aria-hidden="true"></i>';
});

/**
 * Username guesser from email address
 * Ex: jean.dupont@gmail.com => Jean Dupont
 */
Template.registerHelper('usernameGuesser', function() {
    var user = Meteor.user();
    if (user.profile.firstName && user.profile.lastName) {
        return user.profile.firstName + " " + user.profile.lastName;
    }

    return _.map(user.emails[0].address.split('@')[0].split('.'), function(name) {
        return _.capitalize(name);
    }).join(' ');
});

/**
 * Date formatter
 */
Template.registerHelper('formatDate', function(date, defaultValue) {
    if (!date) {
        return defaultValue || '';
    }

    date = moment(date).locale('fr');
    if (date.isSame(new Date(), 'day')) {
        return date.format('HH:mm');
    } else if (date.isSame(new Date(), 'year')) {
        return date.format('Do MMMM');
    } else {
        return date.format('LL');
    }
});

Template.registerHelper('formatDateRelative', function(date) {
    if (!date)
        return;

    return moment(date).fromNow();
});

/**
 * Make helpers accessible from templates
 */
Template.registerHelper('hasRole', function(role, userId) {
    return hasRole(role, userId);
});