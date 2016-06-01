AutoForm.addHooks('answerPollForm', {
    onSuccess: function() {
        throwAlert('Poll answered !', 'success');
    }
});

Template.index.helpers({
    questions: function() {
        return Questions.find({
            status: {
                $ne: 'answered'
            }
        });
    },
    answeredQuestions: function() {
        return Questions.find({
            status: 'answered'
        });
    },
    polls: function() {
        return Polls.find({}, {
            sort: {
                updatedAt: 1
            },
            limit: 1
        })
    },
    answerType: function() {
        return this.type == "single" ? "select-radio" : "select-checkbox";
    },
    answerOptions: function() {
        return _.map(this.answers, function(answer, index) {
            return {
                label: answer,
                value: index
            }
        });
    },
    formDisabled: function() {
        return Answers.findOne({
            pollId: this._id,
            owner: Meteor.userId()
        });
    }
});

var questionStatus = {
    "pending": "warning",
    "selected": "info",
    "published": "success",
    "answered": "success"
};