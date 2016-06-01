ForgotPasswordForm = new SimpleSchema({
    email: {
        type: String,
        label: "Adresse e-mail",
        regEx: SimpleSchema.RegEx.Email,
        autoform: {
            autofocus: true
        }
    }
});