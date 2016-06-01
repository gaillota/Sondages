var types = {
    'single' : 'Single choice',
    'multiple' : 'Multiple choice'
};

PollForm = new SimpleSchema({
    text: {
        type: String,
        autoform: {
            type: 'textarea'
        }
    },
    type: {
        type: String,
        allowedValues: ["single", "multiple"],
        autoform: {
            type: 'select-radio',
            options: [
                {
                    label: "Single choice",
                    value: "single"
                },
                {
                    label: "Multiple choices",
                    value: "multiple"
                }
            ]
        }
    },
    answers: {
        type: [String],
        minCount: 2,
        maxCount: 10
    }
});