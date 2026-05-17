const mongoose = require('mongoose');

const progressionSchema = new mongoose.Schema(
    {
        poids: {
            type: Number,
            required: true,
        },
        taille: {
            type: Number,
            required: true,
        },
        objectif: {
            type: String,
            required: true,
        },
        membre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        seance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seance',
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Progression', progressionSchema);