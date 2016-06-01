Router.map(function () {
    this.route('/moderate/questions', {
        name: 'moderate.questions',
        waitOn: function() {
            return Meteor.subscribe("moderate.questions");
        }
    });
    
    this.route('/speaker', {
        name: 'speaker',
        waitOn: function() {
            return [
                Meteor.subscribe("speaker.polls"),
                Meteor.subscribe("speaker.questions"),
                Meteor.subscribe("speaker.answers")
            ];
        }
    });
});