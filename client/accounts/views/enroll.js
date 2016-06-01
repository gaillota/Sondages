AutoForm.addHooks("EnrollmentForm", {
    onSuccess: function() {
        throwAlert('User successfully created !', 'success');
        Router.go('admin.accounts');
    }
});