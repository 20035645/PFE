const mongoose = require('mongoose');

const programmeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        duree: {
            type: Number,
            required: true,
        },
        niveau: {
            type: String,
            enum: ['débutant', 'intermediaire', 'avance'],
            required: true,
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Programme', programmeSchema);