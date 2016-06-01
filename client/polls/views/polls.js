Template.adminPolls.helpers({
    polls: function() {
        return Polls.find({}, {
            sort: {
                createdAt: 1
            }
        });
    },
    icon: function() {
        var poll = Template.parentData(1);
        return poll.type == "single" ? 'circle-o' : 'square-o'
    }
});

Template.adminPolls.events({
    'click .js-delete-poll': function() {
        if (confirm('Are you sure ?')) {
            Meteor.call('deletePoll', this._id);
        }
    },
    'click .js-fake-polls': function() {
        Meteor.call('createFakePolls');
    }
    // 'click .js-upgrade': function() {
    //     Meteor.call('upgradePoll', this._id);
    // },
    // 'click .js-downgrade': function() {
    //     Meteor.call('downgradePoll', this._id);
    // }
});