Answers = new Mongo.Collection("answers");

Answers.schema = new SimpleSchema({
    answers: {
        type: [Number]
    },
    owner: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    },
    pollId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert && !this.isSet) {
                return new Date();
            }
        }
    }
});

Answers.attachSchema(Answers.schema);

Answers.deny({
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