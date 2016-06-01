AutoForm.addHooks('changePasswordForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;
        
        Accounts.changePassword(doc.oldPassword, doc.newPassword, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        throwAlert('Mot de passe modifié avec succès !', 'success');
    }
});