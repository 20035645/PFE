const mongoose = require('mongoose');

const gymClassSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ['musculation', 'yoga', 'cardio', 'crossfit', 'natation', 'autre'],
            required: true,
        },
        
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',
            required: true,
        },
        
        abonnements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Abonnement',
        }],

        price: {
            type: Number,
            required: true,
        },
            capacity: {
            type: Number,
            required: true,
        },
            Members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },

    { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

module.exports = mongoose.model('GymClass', gymClassSchema);