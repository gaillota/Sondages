// Add an error hook on every form
AutoForm.addHooks(null, {
    onError: function(formType, error) {
        console.log(error);
        if (error.reason) {
            throwAlert(error.reason);
        }
    }
});

// Disable spinner for NProgressBar
NProgress.configure({
    showSpinner: false
});