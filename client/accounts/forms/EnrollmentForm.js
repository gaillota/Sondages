const roles = {
    "admin": "Administrator",
    "speaker": "Speaker",
    "moderator": "Moderator"
};

EnrollmentForm = new SimpleSchema({
    username: {
        type: String,
        label: 'UID',
        autoform: {
            autofocus: true
        }
    },
    email: {
        type: String,
        label: 'Email address',
        regEx: SimpleSchema.RegEx.Email,
        autoform: {
            type: "email"
        }
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    roles: {
        type: [String],
        label: 'Roles',
        optional: true,
        allowedValues: _.keys(roles),
        autoform: {
            type: "select-checkbox",
            options: function() {
                return _.map(roles, function(roleLong, role) {
                    return {
                        label: roleLong,
                        value: role
                    }
                });
            }
        }
    }
});
