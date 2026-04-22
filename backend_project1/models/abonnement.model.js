const mongoose = require('mongoose');

const abonnementSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['mensuel', 'trimestriel', 'annuel'],
            required: true,
        },

        dateDebut: {
            type: Date,
            required: true,
        },

            dateFin: {
            type: Date,
            required: true,
        },

        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        duration: {
            type: Number, // en mois
            required: true,
        },

        GymClass: {
            type: mongoose.Schema.Types.ObjectId,
            enum: ['musculation', 'yoga', 'cardio', 'crossfit', 'natation', 'autre'],
            ref: 'GymClass',
            required: true,
        },
    },
    {
        timestamps: true, // ajoute createdAt et updatedAt automatiquement
    }
);

module.exports = mongoose.model('Abonnement', abonnementSchema);