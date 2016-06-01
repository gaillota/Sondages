Meteor.publish('admin.accounts', function() {
    // Check if user is admin
    if (!this.userId || !isAdmin(this.userId)) {
        console.log('non-authorized');
        return [];
    }

    Counts.publish(this, 'totalAccounts', Meteor.users.find());
    return Meteor.users.find({
        _id: {
            $ne: this.userId
        }
    });
});