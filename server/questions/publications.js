Meteor.publish('questions', function() {
    if (!this.userId) {
        console.log('non-authorized');
        return [];
    }
    
    return Questions.find({
        owner: this.userId
    });
});

Meteor.publish('moderate.questions', function() {
    if (!this.userId || !hasRole(this.userId, 'moderator')) {
        console.log('non-authorized');
        return [];
    }
    
    return Questions.find();
});

Meteor.publish('speaker.questions', function() {
    if (!this.userId || !hasRole(this.userId, 'speaker')) {
        console.log('non-authorized');
        return [];
    }
    
    return Questions.find({
        status: "published"
    });
});