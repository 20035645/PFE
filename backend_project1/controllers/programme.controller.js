const Programme = require('../models/programme.model');

const programmeController = {};

programmeController.getAllProgrammes = async (req, res) => {
    try {
        const programmes = await Programme.find().populate('coach', 'name specialite');
        res.status(200).json(programmes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

programmeController.getProgrammeById = async (req, res) => {
    try {
        const { programmeId } = req.params;
        const programmeData = await Programme.findById(programmeId).populate('coach', 'name specialite');
        if (!programmeData) {
            return res.status(404).json({ error: 'Programme not found' });
        }
        res.status(200).json(programmeData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

programmeController.addProgramme = async (req, res) => {
    try {
        const { name, description, duree, niveau, coach } = req.body;
        const newProgramme = new Programme({ name, description, duree, niveau, coach });
        await newProgramme.save();
        res.status(201).json(newProgramme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

programmeController.updateProgramme = async (req, res) => {
    try {
        const { programmeId } = req.params;
        const updatedProgramme = await Programme.findByIdAndUpdate(
            programmeId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProgramme) {
            return res.status(404).json({ error: 'Programme not found' });
        }
        res.status(200).json(updatedProgramme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

programmeController.deleteProgramme = async (req, res) => {
    try {
        const { programmeId } = req.params;
        const deletedProgramme = await Programme.findByIdAndDelete(programmeId);
        if (!deletedProgramme) {
            return res.status(404).json({ error: 'Programme not found' });
        }
        res.status(200).json({ message: 'Programme deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = programmeController;