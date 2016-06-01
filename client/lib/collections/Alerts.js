// Local (client-only) collection for alerts
Alerts = new Mongo.Collection(null);

AlertsSchema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: ['success', 'danger', 'warning', 'info']
    },
    text: {
        type: String
    },
    icon: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    }
});

Alerts.attachSchema(AlertsSchema);