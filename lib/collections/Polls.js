Polls = new Mongo.Collection("polls");

Polls.schema = new SimpleSchema({
    text: {
        type: String
    },
    type: {
        type: String,
        allowedValues: ["single", "multiple"]
    },
    answers: {
        type: [String],
        minCount: 2,
        maxCount: 10
    },
    rank: {
        type: Number,
        min: 1,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                var lastPoll = Polls.findOne({}, {
                    sort: {
                        rank: -1
                    }
                });

                return lastPoll ? lastPoll.rank + 1 : 1;
            }
        }
    },
    status: {
        type: String,
        allowedValues: ["pending", "selected", "published", "answered"],
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return "pending"
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return new Date();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    }
});

Polls.attachSchema(Polls.schema);

Polls.deny({
    'insert': function() {
        return true;
    },
    'update': function() {
        return true;
    },
    'remove': function() {
        return true;
    }
});

Polls.helpers({
    responses: function() {
        return Answers.find({
            pollId: this._id
        });
    }
});
