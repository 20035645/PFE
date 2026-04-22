const mongoose = require('mongoose');

const fitnessprofileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',   
            required: true,
        },

        coachId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',  
            required: true,
        },

        gymClassType: {
            type: String,
            enum: ['musculation', 'yoga', 'cardio', 'crossfit', 'natation', 'autre'],
            required: true,
        },

        gymClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GymClass',  
            required: true,
        },
 
        weight: {
            type: Number,  // en kg
            required: true,
        },

        
        height: {
            type: Number,  // en cm
            required: true,
        },

        
        goals: {
            type: String,
            enum: ['perte_de_poids', 'musculation', 'cardio', 'souplesse', 'autre'],
            required: true,
        },
    },
    {
        timestamps: true, // ajoute createdAt et updatedAt automatiquement
    }
);

module.exports = mongoose.model('FitnessProfile', fitnessprofileSchema);