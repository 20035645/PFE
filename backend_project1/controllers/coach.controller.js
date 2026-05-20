const coachModel = require('../models/coach.model');

module.exports.getAllCoachs = async (req, res) => {
    try {
        const coachs = await coachModel.find();
        res.status(200).json(coachs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getCoachById = async (req, res) => {
    try {
        // ✅ coachModel au lieu de Coach
        const coach = await coachModel.findById(req.params.coachId);
        if (!coach) return res.status(404).json({ error: "Coach not found" });
        res.status(200).json(coach);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.addCoach = async (req, res) => {
    try {
        // ✅ Récupère tous les champs envoyés depuis Postman
        const { name, email, password, phone, specialite } = req.body;

        const newCoach = new coachModel({ name, email, password, phone, specialite });
        // ✅ Plus de coachId ou FaceID non définis — MongoDB génère _id tout seul
        
        await newCoach.save();
        res.status(201).json(newCoach);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteCoach = async (req, res) => {
    try {
        // ✅ coachModel au lieu de Coach
        const deleted = await coachModel.findByIdAndDelete(req.params.coachId);
        if (!deleted) return res.status(404).json({ error: "Coach not found" });
        res.status(200).json({ message: "Coach deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.UpdateCoach = async (req, res) => {
    try {
        // ✅ req.body ajouté pour vraiment mettre à jour les données
        const updatedCoach = await coachModel.findByIdAndUpdate(
            req.params.coachId,
            req.body,        // ← manquait !
            { new: true }    // ← était mal placé
        );
        if (!updatedCoach) return res.status(404).json({ error: "Coach not found" });
        res.status(200).json({ message: "Coach updated successfully", updatedCoach });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};