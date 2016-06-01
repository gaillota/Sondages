Router.map(function() {
    this.route('/admin/polls', {
        name: 'admin.polls',
        waitOn: function() {
            return Meteor.subscribe('admin.polls');
        }
    });

    this.route('/admin/polls/create', {
        name: 'admin.polls.create'
    });
    
    this.route('/moderate/polls', {
        name: 'moderate.polls',
        waitOn: function () {
            return Meteor.subscribe('moderate.polls');
        }
    });
});