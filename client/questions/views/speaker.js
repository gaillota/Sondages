Template.speaker.helpers({
    currentPoll: function() {
        return Polls.findOne({
            status: "published"
        }, {
            sort: {
                updatedAt: 1
            }
        }) || Polls.findOne({
                status: "answered"
            }, {
                sort: {
                    updatedAt: -1
                }
            });
    },
    currentQuestion: function() {
        return Questions.findOne({
            status: "published"
        }, {
            sort: {
                updatedAt: 1
            }
        });
    },
    icon: function() {
        var poll = Template.parentData(1);
        return poll.type == "single" ? 'circle-o' : 'square-o';
    },
    results: function() {
        var poll = Polls.findOne(this._id);
        var nbrColumn = poll.answers.length;
        var columnWidthPercent = (100 / nbrColumn) - 10;
        // Number of users
        var users = Counts.get('totalAccounts');

        var answers = Answers.find({
            pollId: this._id
        });

        var results = new Array(nbrColumn).fill(0);
        _.each(answers.fetch(), function(answer) {
            answers = answer.answers;
            _.each(answers, function(index) {
                results[index] += 1;
            });
        });

        var percentForMaxValue = 80;
        var hundredPercentValue = (users * 100) / percentForMaxValue;
        _.each(results, function(result, index) {
            var height = (result / hundredPercentValue) * 100;
            results[index] = {
                answer: poll.answers[index],
                result : result,
                height: ~~height,
                width: ~~columnWidthPercent
            };
        });

        return results;
    },
    votes: function() {
        // Number of regular users
        var users = Counts.get('totalAccounts') ;
        // Number of answers
        var answers = Answers.find({
            pollId: this._id
        });


        var percent = ((answers.count() / users) * 100) || 0;
        var percentRounded = ~~percent;

        var degree = (percent * 1.8) - 90;

        return {
            degree: degree.toFixed(2),
            percent: percentRounded
        };
    }
    // percentChart: function() {
    //     // Number of users
    //     var users = Counts.get('totalAccounts');
    //     // Number of answers
    //     var answers = Answers.find({
    //         pollId: this._id
    //     });
    //
    //     var percent = (answers.count() / users) * 100;
    //     var percentRounded = ~~percent;
    //
    //     Highcharts.chart('percentChart', {
    //         chart: {
    //             plotBackgroundColor: null,
    //             plotBorderWidth: 0,
    //             plotShadow: false
    //         },
    //         title: {
    //             text: percentRounded + ' %',
    //             align: 'center',
    //             verticalAlign: 'middle',
    //             y: 80
    //         },
    //         tooltip: {
    //             enabled: false
    //         },
    //         plotOptions: {
    //             pie: {
    //                 dataLabels: {
    //                     enabled: false
    //                 },
    //                 startAngle: -90,
    //                 endAngle: 90,
    //                 center: ['50%', '75%']
    //             }
    //         },
    //         series: [{
    //             type: 'pie',
    //             name: '% responses',
    //             innerSize: '70%',
    //             data: [
    //                 ['Responses', answers.count()],
    //                 ['No responses', users - answers.count()]
    //             ],
    //             animation: false
    //         }]
    //     });
    // },
    // resultsChart: function() {
    //     var poll = Polls.findOne(this._id);
    //     var nbrColumn = poll.answers.length;
    //
    //     var answers = Answers.find({
    //         pollId: this._id
    //     }).fetch();
    //
    //     var results = new Array(nbrColumn).fill(0);
    //     _.each(answers, function(answer) {
    //         answers = answer.answers;
    //         _.each(answers, function(index) {
    //             results[index] += 1;
    //         })
    //     });
    //
    //     Highcharts.chart('resultsChart', {
    //         chart: {
    //             type: 'column'
    //         },
    //         title: {
    //             text: ''
    //         },
    //         xAxis: {
    //             categories: _.range(1, nbrColumn + 1)
    //         },
    //         yAxis: {
    //             min: 0,
    //             allowDecimals: false
    //         },
    //         series: [{
    //             name: poll.text,
    //             data: results,
    //             animation: false
    //         }]
    //     });
    // }
});

// Template.percentChart.onRendered(function() {
//     var cursor = Template.currentData();
//     var parentData = Template.parentData(1);
//     var initializing = true; // add initializing variable, see:  http://docs.meteor.com/#/full/meteor_publish
//     var liveChart;
//
//     // Number of users
//     var users = Counts.get('totalAccounts');
//     // Number of answers
//     var answers = Answers.find({
//         pollId: parentData._id
//     });
//
//     var percent = (answers.count() / users) * 100;
//     var percentRounded = ~~percent;
//
//     // Create basic line-chart:
//     liveChart = Highcharts.chart(cursor.chart_id, {
//         chart: {
//             plotBackgroundColor: null,
//             plotBorderWidth: 0,
//             plotShadow: false
//         },
//         title: {
//             text: percentRounded + ' %',
//             align: 'center',
//             verticalAlign: 'middle',
//             y: 80
//         },
//         tooltip: {
//             enabled: false
//         },
//         plotOptions: {
//             pie: {
//                 dataLabels: {
//                     enabled: false
//                 },
//                 startAngle: -90,
//                 endAngle: 90,
//                 center: ['50%', '75%']
//             }
//         },
//         series: [{
//             type: 'pie',
//             name: '% responses',
//             innerSize: '70%',
//             data: [
//                 ['Responses', answers.count()],
//                 ['No responses', users - answers.count()]
//             ],
//             animation: false
//         }]
//     });
//
//     // Add watchers:
//     answers.observeChanges({
//         added: function () {
//             if (!initializing) {
//                 // We will use Highcharts API to add point with "value = previous_value + 1" to indicate number of tasks
//                 var points = liveChart.series[0].points;
//                 liveChart.series[0].addPoint(
//                     points[points.length - 1].y + 1
//                 );
//             }
//         },
//         removed: function () {
//             if (!initializing) {
//                 // We will use Highcharts API to add point with "value = previous_value - 1" to indicate number of tasks
//                 var points = liveChart.series[0].points;
//                 liveChart.series[0].addPoint(
//                     points[points.length - 1].y - 1
//                 );
//             }
//         }
//     });
//     initializing = false;
// });