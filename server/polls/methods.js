Meteor.methods({
    createPoll: function(doc) {
        checkAdmin();
        
        Polls.insert(doc);
    },
    createFakePolls: function() {
        checkAdmin();

        _.each(_.range(10), function() {
            var text = faker.lorem.sentence();
            var type = 'single multiple'.split(' ')[_.random(1)];
            var answers = faker.fake("{{lorem.words}}").split(',');

            var poll = {
                text: text,
                type: type,
                answers: answers
            };

            Polls.insert(poll);
        });
    },
    deletePoll: function(pollId) {
        checkAdmin();
        check(pollId, String);
        
        Polls.remove(pollId);
    },
    changePollStatus: function(pollId, status) {
        checkModerator();
        check(pollId, String);

        if (_.indexOf('pending selected published answered'.split(' '), status) < 0) {
            throw new Meteor.Error(403, 'Status not valid');
        }

        var poll = Polls.findOne(pollId);

        if (!poll) {
            throw new Meteor.Error(403, 'Question not found');
        }

        if (_.indexOf(nextStatusPossible[poll.status], status) < 0) {
            throw new Meteor.Error(403, 'You cannot change the question statut from ' + poll.status + ' to ' + status);
        }

        Polls.update(pollId, {
            $set: {
                status: status
            }
        });
    },
    answerPoll: function(doc) {
        check(Meteor.userId(), String);
        if (_.isArray(doc.answers)) {
            check(doc, {
                answers: [Number]
            });
        } else if (_.isString(doc.answers)) {
            doc.answers = [Number(doc.answers)]
        } else {
            throw new Meteor.Error(403, 'Answer not valid');
        }

        if (Meteor.user().roles && Meteor.user().roles.length > 0) {
            throw new Meteor.Error(403, 'Only regular users can answer poll questions');
        }

        var poll = Polls.findOne({
            status: "published"
        }, {
            sort: {
                updatedAt: 1
            }, limit: 1
        });

        if (!poll) {
            throw new Meteor.Error(404, 'Poll not found');
        }

        var answer = Answers.findOne({
            pollId: poll._id,
            owner: Meteor.userId()
        });

        if (answer) {
            throw new Meteor.Error(403, 'You already answered this poll question');
        }

        doc.owner = Meteor.userId();
        doc.pollId = poll._id;

        Answers.insert(doc);
    }
});

var nextStatusPossible = {
    "pending": 'selected'.split(' '),
    "selected" : 'pending published'.split(' '),
    "published": 'answered'.split(' '),
    "answered": []
};