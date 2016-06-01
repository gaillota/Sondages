var onBeforeHooks = {
    notLoggedIn: function() {
        if (Meteor.userId()) {
            this.redirect('index');
        } else {
            this.next();
        }
    },
    isLoggedIn: function() {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    },
    isModerator: function() {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            if (!Roles.userIsInRole(Meteor.userId(), 'moderator')) {
                throwAlert("You don't have the rights to access this section.");
                this.redirect('index');
            } else {
                this.next();
            }
        }
    },
    isAdmin: function() {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
                throwAlert("VYou don't have the rights to access this section.");
                this.redirect('index');
            } else {
                this.next();
            }
        }
    }
};

// Routes which does not need logged in users
var nonAuthRoutes = 'login forgotPassword resetPassword'.split(' ');

// Redirect user if he is logged in
Router.onBeforeAction(onBeforeHooks.notLoggedIn, {
    only: nonAuthRoutes
});

// Redirect user to login page if he is not
Router.onBeforeAction(onBeforeHooks.isLoggedIn, {
    except: nonAuthRoutes
});

Router.onBeforeAction(onBeforeHooks.isModerator, {
    only: 'moderate.questions'.split(' ')
});

// Redirect user if is not authorized to access admin pages
Router.onBeforeAction(onBeforeHooks.isAdmin, {
    only: 'admin admin.accounts'.split(' ')
});