const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'coach', 'membre'], default: 'membre' },

    // membre
    dateInscrit: { type: Date, default: Date.now },
    statut: { type: String, enum: ['actif', 'inactif', 'suspendu'], default: 'actif' },
    numTelephone: { type: String },
    age: { type: Number },
    objectif: { type: String },
    coachAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // coach
    specialite: { type: String },
    experience: { type: Number },
    tarif: { type: Number },
    disponibilites: { type: [String], default: [] },

    // admin
    permissions: { type: [String], default: [] },

    photo: { type: String },

}, { timestamps: true });

/* /*userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});*/

userSchema.statics.Login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('Invalid email or password');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    return user;
};

userSchema.statics.Register = async function (userData) {
    const existingUser = await this.findOne({ email: userData.email });
    if (existingUser) throw new Error('Email already in use');
    const newUser = new this(userData);
    await newUser.save();
    return newUser;
};

module.exports = mongoose.model('User', userSchema);