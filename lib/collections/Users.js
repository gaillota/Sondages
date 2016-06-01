UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

UserSchema = new SimpleSchema({
    username: {
        type: String
    },
    emails: {
        type: Array
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    lastConnectionAt: {
        type: Date,
        optional: true
    },
    profile: {
        type: UserProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    },
    status: {
        type: Object,
        optional: true,
        blackbox: true
    },
    disabled: {
        type: Boolean,
        optional: true
    }
});

Meteor.users.attachSchema(UserSchema);

Meteor.users.allow({
    'insert': function() {
        return false;
    },
    'update': function(userId) {
        return isAdmin(userId);
    },
    'remove': function(userId) {
        return isAdmin(userId);
    }
});
