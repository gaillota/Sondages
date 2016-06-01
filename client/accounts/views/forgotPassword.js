AutoForm.addHooks('forgotPasswordForm', {
    onSubmit: function(doc) {
        this.event.preventDefault();
        var self = this;

        Accounts.forgotPassword(doc, function(error) {
            self.done(error);
        });
    },
    onSuccess: function() {
        throwAlert('Un e-mail contenant les instructions à suivre vous a été envoyé.', 'success');
    }
});