var allowedStatus = 'pending selected answered'.split(' ');

Template.moderateQuestions.helpers({
    questionWithStatus: function(status) {
        status = status || 'published';
        check(status, String);

        var sort = status == 'published' ? { updated: 1 } : { updatedAt: -1 };

        return Questions.find({
            status: status
        }, {
            sort: sort
        });
    }
});

Template.moderateQuestions.events({
    'click .js-select-question': function() {
        var status = this.status == 'pending' ? 'selected' : 'pending';
        Meteor.call('changeQuestionStatus', this._id, status);
    },
    'click .js-publish-question': function() {
        Meteor.call('changeQuestionStatus', this._id, 'published');
    },
    'click .js-archive-question': function() {
        Meteor.call('changeQuestionStatus', this._id, 'answered');
    }
});