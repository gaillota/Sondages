Router.map(function() {
    this.route('/', {
        name: 'index',
        waitOn: function() {
            return [
                Meteor.subscribe('questions'),
                Meteor.subscribe('polls'),
                Meteor.subscribe('answers')
            ];
        }
    });
});