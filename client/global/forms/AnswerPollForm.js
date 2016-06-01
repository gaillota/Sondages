AnswerPollForm = new SimpleSchema({
    answers: {
        type: [Number],
        autoValue: function() {
            if (this.isInsert && this.isSet && _.isString(this.value)) {
                return [Number(this.value)];
            }
        }
    }
});