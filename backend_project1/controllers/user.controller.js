const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');    // collection 'membres'
const coachModel = require('../models/coach.model');  // collection 'coaches'
const memberModel = require('../models/member.model');
const jwt = require('jsonwebtoken');

const mapMemberObjectif = (objectif) => {
    if (!objectif) return undefined;
    const key = String(objectif).trim().toLowerCase();
    const map = {
        'prise de masse': 'musculation',
        'perte de poids': 'perte_de_poids',
        'perte_de_poids': 'perte_de_poids',
        'remise en forme': 'cardio',
        'sèche': 'autre',
        'seche': 'autre',
        musculation: 'musculation',
        cardio: 'cardio',
        souplesse: 'souplesse',
        autre: 'autre',
    };
    return map[key] || 'autre';
};

const mapAbonnementType = (plan) => {
    const map = {
        standard: 'mensuel', premium: 'trimestriel',
        coaching: 'annuel', mensuel: 'mensuel',
        trimestriel: 'trimestriel', annuel: 'annuel',
    };
    return map[plan] || 'mensuel';
};

const abonnementDurationMonths = (type) => {
    if (type === 'trimestriel') return 3;
    if (type === 'annuel') return 12;
    return 1;
};

const maxAge = 3 * 24 * 60 * 60;
const secretKey = "net secret key";
const createToken = (id) => jwt.sign({ id }, secretKey, { expiresIn: maxAge });

// ── GET ALL USERS ──────────────────────────────────────────
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role, numTelephone, age, objectif, specialite, experience, tarif } = req.body;
        const newUser = new userModel({ name, email, password, role, numTelephone, age, objectif, specialite, experience, tarif });
        await newUser.save();
        const userObj = newUser.toObject();
        delete userObj.password;
        res.status(201).json(userObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...updateData } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ── LOGIN ──────────────────────────────────────────────────
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = null;
        let role = null;

        // 1 — cherche dans 'membres' (membres + admins)
        const userFound = await userModel.findOne({ email });
        if (userFound) {
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (isMatch) {
                user = userFound;
                role = userFound.role; // 'membre' ou 'admin'
            }
        }

        // 2 — si pas trouvé, cherche dans 'coaches'
        if (!user) {
            const coachFound = await coachModel.findOne({ email });
            if (coachFound) {
                const isMatch = await bcrypt.compare(password, coachFound.password);
                if (isMatch) {
                    user = coachFound;
                    role = "coach";
                }
            }
        }

        // 3 — rien trouvé
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // 4 — crée le token et retourne
        const token = createToken(user._id);
        const userObj = user.toObject();
        delete userObj.password;
        userObj.role = role; // ✅ force le bon rôle

        res.status(200).json({
            message: 'Login successful',
            user: userObj,
            token
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// ── REGISTER ───────────────────────────────────────────────
module.exports.register = async (req, res) => {
    try {
        const {
            name, nom, prenom, email, password,
            role = 'membre',
            numTelephone, age, poids, taille,
            objectif, specialite, experience, tarif,
            abonnement,
        } = req.body;

        const displayName = name || [prenom, nom].filter(Boolean).join(' ').trim();
        if (!displayName || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' });
        }

        // Vérifie email dans membres
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        // Vérifie email dans coaches
        const existingCoach = await coachModel.findOne({ email });
        if (existingCoach) return res.status(400).json({ error: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name: displayName, email,
            password: hashedPassword,
            role, numTelephone, age, poids, taille,
            objectif, specialite, experience, tarif,
            statut: 'actif',
        });
        await newUser.save();

        // Si membre → crée aussi dans 'membres' collection
        if (role === 'membre') {
            const abonnementType = mapAbonnementType(abonnement);
            const dateDebut = new Date();
            const dateFin = new Date(dateDebut);
            dateFin.setMonth(dateFin.getMonth() + abonnementDurationMonths(abonnementType));
            const phoneDigits = numTelephone
                ? parseInt(String(numTelephone).replace(/\D/g, ''), 10)
                : undefined;

            try {
                await memberModel.create({
                    userId: newUser._id,
                    name: displayName,
                    email,
                    password,
                    phone: Number.isNaN(phoneDigits) ? undefined : phoneDigits,
                    age,
                    objectif: mapMemberObjectif(objectif),
                    abonnementType,
                    dateDebut,
                    dateFin,
                    abonnementActif: true,
                    status: 'pending',
                });
            } catch (memberError) {
                await userModel.findByIdAndDelete(newUser._id);
                throw memberError;
            }
        }

        const token = createToken(newUser._id);
        const userObj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({
            message: 'Registration successful',
            user: userObj,
            token
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports.getMembres = async (req, res) => {
    try {
        const membres = await userModel.find({ role: 'membre' }).select('-password');
        res.status(200).json(membres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getCoaches = async (req, res) => {
    try {
        const coaches = await coachModel.find().select('-password');
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};