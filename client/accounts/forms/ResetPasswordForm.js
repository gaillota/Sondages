ResetPasswordForm = new SimpleSchema({
    newPassword: {
        type: String,
        label: "Nouveau mot de passe",
        min: 5,
        autoform: {
            type: "password",
            autofocus: true
        }
    },
    confirmPassword: {
        type: String,
        label: "Confirmation",
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