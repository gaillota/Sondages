LoginForm = new SimpleSchema({
    username: {
        type: String,
        label: "UID / Email address",
        autoform: {
            type: "email",
            autofocus: true
        }
    },
    password: {
        type: String,
        label: "Password",
        autoform: {
            type: "password"
        }
    }
});