const fitnessprofileModel = require('../models/fitnessprofile.model');

module.exports.getAllFitnessProfiles = async (req, res) => {
    try {
        const fitnessprofiles = await fitnessprofileModel.find();   
        res.status(200).json(fitnessprofiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getFitnessProfileById = async (req, res) => {
    try {
        const { fitnessProfileId } = req.params;
        const fitnessprofile = await fitnessprofileModel.findById(fitnessProfileId);
        res.status(200).json({ message: 'FitnessProfile:', data: fitnessProfileId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.addFitnessProfile = async (req, res) => {
    try {
        const { fitnessProfileId, memberId, weight, height, goals } = req.body;
        const newFitnessProfile = new fitnessprofileModel({ fitnessProfileId, memberId, weight, height, goals });
        await newFitnessProfile.save();
        res.status(201).json(newFitnessProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.deleteFitnessProfile = async (req, res) => {
    try {
        const { fitnessProfileId } = req.params;
        const deletedFitnessProfile = await fitnessprofileModel.findByIdAndDelete(fitnessProfileId);
        if (!deletedFitnessProfile) {
            return res.status(404).json({ error: "FitnessProfile not found" });
        }
        res.status(200).json({ message: "FitnessProfile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.updateFitnessProfile = async (req, res) => {
    try {
        const { fitnessProfileId } = req.params;
        const { weight, height, goals } = req.body;
        const updatedFitnessProfile = await fitnessprofileModel.findByIdAndUpdate(
            fitnessProfileId,
            { weight, height, goals },
            { new: true },
        );
        if (!updatedFitnessProfile) {
            return res.status(404).json({ error: "FitnessProfile not found" });
        }
        res.status(200).json({ message: "FitnessProfile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getFitnessProfileByMemberId = async (req, res) => {
    try {
        const { memberId } = req.body;
        const fitnessprofile = await fitnessprofileModel.findOne({ memberId });
        if (!fitnessprofile) {
            return res.status(404).json({ error: "FitnessProfile not found" });
        }   
        res.status(200).json(fitnessprofile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getFitnessProfileByWeight = async (req, res) => {
    try {
        const { weight } = req.body;
        const fitnessprofiles = await fitnessprofileModel.find({ weight });
        res.status(200).json(fitnessprofiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
