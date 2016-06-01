Meteor.publish('admin.polls', function() {
    if (!this.userId || !hasRole(this.userId, 'admin')) {
        console.log('You must be administrator to access this section.');
        return [];
    }
    
    return Polls.find();
});

Meteor.publish('moderate.polls', function() {
    if (!this.userId || !hasRole(this.userId, 'moderator')) {
        console.log('You must be moderator to access this section.');
        return [];
    }
    
    return Polls.find();
});

Meteor.publish('speaker.polls', function() {
    if (!this.userId || !hasRole(this.userId, 'speaker')) {
        console.log('non-authorized');
        return [];
    }

    return [
        Polls.find({
            status: {
                $in: ["published", "answered"]
            }
        })
    ];
});

Meteor.publish('speaker.answers', function() {
    if (!this.userId || !hasRole(this.userId, 'speaker')) {
        console.log('non-authorized');
        return [];
    }

    Counts.publish(this, 'totalAccounts', Meteor.users.find({
        roles: {
            $exists: false
        }
    }));

    return Answers.find({
        //pollId: poll._id
    });
});

Meteor.publish('polls', function() {
    if(!this.userId) {
        console.log('non-authorized');
        return [];
    }
    
    return Polls.find({
        status: "published"
    });
});

Meteor.publish('answers', function() {
    if(!this.userId) {
        console.log('non-authorized');
        return [];
    }
    
    return Answers.find({
        owner: this.userId
    });
});