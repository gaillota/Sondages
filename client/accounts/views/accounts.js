Template.adminAccounts.helpers({
    usersCount: function() {
        return Counts.get('totalAccounts') - 1;
    },
    users: function() {
        return Meteor.users.find({}, {
            sort: {
                createdAt: -1
            }
        });
    },
    userConnectionStatus: function() {
        if (!this.status) {
            return 'gray';
        } else {
            if (this.status.online) {
                return 'green';
            } else if (this.status.idle) {
                return 'orange';
            } else {
                return 'gray';
            }
        }
    },
    userStatus: function() {
        if (this.disabled) {
            return {
                type: 'danger',
                icon: 'user-times',
                text: 'Désactivé'
            }
        } else if (this.emails[0].verified) {
            return {
                type: 'success',
                icon: 'check',
                text: 'Actif'
            }
        } else {
            return {
                type: 'warning',
                icon: 'clock-o',
                text: 'En attente'
            }
        }
    },
    isAdmin: function(userId) {
        return isAdmin(userId);
    },
    isDisabled: function() {
        return !!this.disabled;
    },
    myself: function() {
        return this._id === Meteor.userId();
    }
});

Template.adminAccounts.events({
    'click .js-disable': function() {
        Meteor.users.update(this._id, {
            $set: {
                disabled: !this.disabled
            }
        });
    },
    'click .js-delete': function() {
        if (confirm('Êtes-vous sûr de vouloir supprimer ' + this.emails[0].address)) {
            Meteor.users.remove(this._id);
        }
    }
});