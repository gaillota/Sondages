ChangePasswordForm = new SimpleSchema({
    oldPassword: {
        type: String,
        label: "Mot de passe actuel",
        autoform: {
            type: "password",
            autofocus: true
        }
    },
    newPassword: {
        type: String,
        label: "Nouveau mot de passe",
        min: 5,
        autoform: {
            type: "password"
        }
    },
    newPasswordConfirm: {
        type: String,
        label: "Confirmation mot de passe",
        autoform: {
            type: "password"
        },
        custom: function() {
            if (this.value !== this.field('newPassword').value) {
                return 'passwordMismatch';
            }
        }
    }
});