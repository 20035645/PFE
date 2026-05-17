const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        heure: {
            type: String,
            required: true,
        },
        capacite: {
            type: Number,
            required: true,
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        programme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Programme',
        },
        membres: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Seance', seanceSchema);