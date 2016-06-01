AutoForm.addHooks('pollForm', {
    onSuccess: function() {
        throwAlert('Poll question successfully created', 'success');
        Router.go('admin.polls');
    }
});