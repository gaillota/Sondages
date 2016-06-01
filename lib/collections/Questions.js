Questions = new Mongo.Collection("questions");

Questions.schema = new SimpleSchema({
    text: {
        type: String
    },
    status: {
        type: String,
        allowedValues: ['pending', 'selected', 'published', 'answered'],
        autoValue: function() {
            if (!this.isSet && this.isInsert) {
                return 'pending';
            }
        }
    },
    owner: {
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
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        }
    }
});

Questions.attachSchema(Questions.schema);

Questions.allow({
    'insert': function() {
        return true;
    },
    'update': function(userId) {
        return isQuestionAdmin(userId);
    }
});
