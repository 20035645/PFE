const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const secretKey = "net secret key";

const createToken = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: maxAge });
};

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
        const newUser = new userModel({
            name, email, password, role,
            numTelephone, age, objectif,
            specialite, experience, tarif
        });
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
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
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

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.Login(email, password); 
        if (!user) return res.status(404).json({ error: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });
        const token = createToken(user._id);
        const userObj = user.toObject();
        delete userObj.password;
        res.status(200).json({ message: 'Login successful', user: userObj, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dans user.controller.js — remplace la fonction register par celle-ci :

module.exports.register = async (req, res) => {
    try {
        const {
            name, email, password, role,
            numTelephone, age, poids, taille,  // ← poids et taille ajoutés
            objectif, specialite, experience, tarif
        } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name, email,
            password: hashedPassword,
            role, numTelephone,
            age, poids, taille,   // ← poids et taille ajoutés
            objectif, specialite, experience, tarif
        });

        await newUser.save();

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
        const coaches = await userModel.find({ role: 'coach' }).select('-password');
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};