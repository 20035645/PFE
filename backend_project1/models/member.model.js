const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema(
    {
        
        // INFOS PERSONNELLES
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },

        password: {
            type: String,
            required: true,
        },

        phone:  { type: Number },
        photo:  { type: String, default: null },
        active: { type: Boolean, default: true },
        age:    { type: Number },

        // OBJECTIF SPORTIF
        objectif: {
            type: String,
            enum: ['perte_de_poids', 'musculation', 'cardio', 'souplesse', 'autre'],
        },

        perf: { type: String }, 

        
        // ABONNEMENT
        abonnementType: {
            type: String,
            enum: ['mensuel', 'trimestriel', 'annuel'],
        },
        
        dateDebut : { type: Date },
        dateFin :   { type: Date },
        price :      { type: Number }, 
        abonnementActif : { type: Boolean, default: true },

        // COACH ASSIGNÉ
        coachAssigned: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach', 
        },
    },
    { timestamps: true }
);


// HASH MOT DE PASSE avant save
memberSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// MÉTHODE: vérifier mot de passe (login)
// usage: const isValid = await member.comparePassword(req.body.password)
memberSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Member', memberSchema); 