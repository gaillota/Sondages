AutoForm.addHooks('resetPasswordForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Accounts.resetPassword(Router.current().params.token, doc.newPassword, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        throwAlert('Mot de passe modifié avec succès ! Vous pouvez désormais utiliser votre nouveau mot de passe pour vous connecter', 'success');
        Router.go('login');
    }
});