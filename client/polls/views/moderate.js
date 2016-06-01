var allowedStatus = 'pending selected published'.split(' ');

Template.moderatePolls.helpers({
    pollsWithStatus: function(status) {
        status = status || 'pending';
        check(status, String);

        var sort = status == 'published' ? { updated: 1 } : { updatedAt: -1 };

        return Polls.find({
            status: status
        }, {
            sort: sort
        });
    }
});

Template.pollPanel.helpers({
    icon: function() {
        var poll = Template.parentData(1);
        return poll.type == "single" ? 'circle-o' : 'square-o'
    },
    isStatus: function(status) {
        return this.status == status;
    }
});

Template.pollPanel.events({
    'click .js-select-poll': function() {
        var status = this.status == 'pending' ? 'selected' : 'pending';
        Meteor.call('changePollStatus', this._id, status);
    },
    'click .js-publish-poll': function() {
        if (confirm('Are you sure you want to send this question to the audience ?')) {
            Meteor.call('changePollStatus', this._id, 'published');
        }
    },
    'click .js-archive-poll': function() {
        Meteor.call('changePollStatus', this._id, 'answered');
    }
});