QuestionForm = new SimpleSchema({
    text: {
        type: String,
        label: 'Your question',
        autoform: {
            type: 'textarea',
            placeholder: 'Ask a question to the speaker...'
        }
    }
});