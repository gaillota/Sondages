Meteor.methods({
    askQuestion: function(doc) {
        checkUser();
        
        doc.owner = Meteor.userId();
        Questions.insert(doc);
    },
    changeQuestionStatus: function(questionId, status) {
        checkModerator();

        check(questionId, String);
        check(status, String);

        if (_.indexOf('pending selected published answered'.split(' '), status) < 0) {
            throw new Meteor.Error(403, 'Status not valid');
        }
        
        var question = Questions.findOne(questionId);
        
        if (!question) {
            throw new Meteor.Error(403, 'Question not found');
        }
        
        if (_.indexOf(nextStatusPossible[question.status], status) < 0) {
            throw new Meteor.Error(403, 'You cannot change the question statut from ' + question.status + ' to ' + status);
        }
        
        Questions.update(questionId, {
            $set: {
                status: status
            }
        });
    }
});

var nextStatusPossible = {
    "pending": 'selected'.split(' '),
    "selected" : 'pending published'.split(' '),
    "published": 'answered'.split(' '),
    "answered": []
};