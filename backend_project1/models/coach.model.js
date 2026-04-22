const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const coachSchema = new mongoose.Schema(
    {
        // Infos personnelles
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

        phone:    { type: Number },
        photo:    { type: String, default: null },
        active:   { type: Boolean, default: true },

        // Infos coach
        specialite: {
            type: String,
            enum: ['musculation', 'yoga', 'cardio', 'crossfit', 'natation', 'autre'],
        },

        GymClass: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GymClass',
        }],

        experience:     { type: Number },  // années d'expérience
        tarif:          { type: Number },  // tarif horaire en DT
        disponibilites: { type: [String], default: [] },
        

        // Liste des membres suivis
        membres: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    
    { timestamps: true }
);


coachSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// ✅ AJOUTÉ: Méthode login
// usage: const isValid = await coach.comparePassword(req.body.password)
coachSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Coach', coachSchema);