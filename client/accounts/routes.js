Router.map(function() {
    // Login route
    this.route('/login');

    // Forgot password route
    this.route('/forgot-password', {
        name: 'forgotPassword'
    });

    // Reset password route
    this.route('/reset-password/:token', {
        name: 'resetPassword'
    });

    /**
     * Accounts management
     */
    this.route('/admin/accounts', {
        name: 'admin.accounts',
        waitOn: function() {
            return Meteor.subscribe('admin.accounts');
        }
    });
    this.route('/admin/accounts/enroll', {
        name: 'admin.accounts.enroll'
    });
});