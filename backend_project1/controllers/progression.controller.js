const progressionController = {};
const Progression = require('../models/progression.model');

progressionController.getAllProgressions = async (req, res) => {
    try {
        const progressions = await Progression.find()
            .populate('membre', 'name email')
            .populate('seance', 'date heure');
        res.status(200).json(progressions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

progressionController.getProgressionById = async (req, res) => {
    try {
        const { progressionId } = req.params;
        const progression = await Progression.findById(progressionId)
            .populate('membre', 'name email')
            .populate('seance', 'date heure');
        if (!progression) {
            return res.status(404).json({ error: 'Progression not found' });
        }
        res.status(200).json(progression);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

progressionController.addProgression = async (req, res) => {
    try {
        const { poids, taille, objectif, membre, seance } = req.body;
        const newProgression = new Progression({ 
            poids, taille, objectif, membre,
            ...(seance ? { seance } : {})  // ← n'inclut seance que si non vide
        });
        await newProgression.save();
        res.status(201).json(newProgression);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
progressionController.updateProgression = async (req, res) => {
    try {
        const { progressionId } = req.params;
        const updatedProgression = await Progression.findByIdAndUpdate(
            progressionId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProgression) {
            return res.status(404).json({ error: 'Progression not found' });
        }
        res.status(200).json(updatedProgression);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

progressionController.deleteProgression = async (req, res) => {
    try {
        const { progressionId } = req.params;
        const deletedProgression = await Progression.findByIdAndDelete(progressionId);
        if (!deletedProgression) {
            return res.status(404).json({ error: 'Progression not found' });
        }
        res.status(200).json({ message: 'Progression deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

progressionController.getProgressionsByMembre = async (req, res) => {
    try {
        const { membreId } = req.params;
        const progressions = await Progression.find({ membre: membreId })
            .populate('membre', 'name email')
            .populate('seance', 'date heure');
        res.status(200).json(progressions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = progressionController;