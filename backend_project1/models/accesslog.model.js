const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema(
    {
        memberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member',
            required: true,
        },

        accessTime: {
            type: Date,
            default: Date.now,
        },

        accessType: {
            type: String,
            enum: ['entrée', 'sortie'],
            required: true,
        },

        gymClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GymClass',
        },

        cameraId: {
            type: String,
        },
        
        
    },
    { timestamps: true }
);
