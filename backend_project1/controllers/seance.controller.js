const Seance = require('../models/seance.model.js');

module.exports.getAllSeances = async (req, res) => {
    try {
        const seances = await Seance.find()
            .populate('coach', 'name specialite')
            .populate('programme', 'name niveau')
            .populate('membres', 'name email');
        res.status(200).json(seances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getSeanceById = async (req, res) => {
    try {
        const { seanceId } = req.params;
        const seanceData = await Seance.findById(seanceId)
            .populate('coach', 'name specialite')
            .populate('programme', 'name niveau')
            .populate('membres', 'name email');
        if (!seanceData) {
            return res.status(404).json({ error: 'Seance not found' });
        }
        res.status(200).json(seanceData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.addSeance = async (req, res) => {
    try {
        const { date, heure, capacite, coach, programme } = req.body;
        const newSeance = new Seance({ date, heure, capacite, coach, programme });
        await newSeance.save();
        res.status(201).json(newSeance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.updateSeance = async (req, res) => {
    try {
        const { seanceId } = req.params;
        const updatedSeance = await Seance.findByIdAndUpdate(
            seanceId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedSeance) {
            return res.status(404).json({ error: 'Seance not found' });
        }
        res.status(200).json(updatedSeance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteSeance = async (req, res) => {
    try {
        const { seanceId } = req.params;
        const deletedSeance = await Seance.findByIdAndDelete(seanceId);
        if (!deletedSeance) {
            return res.status(404).json({ error: 'Seance not found' });
        }
        res.status(200).json({ message: 'Seance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getSeancesByProgramme = async (req, res) => {
    try {
        const { programmeId } = req.params;
        const seances = await Seance.find({ programme: programmeId })
            .populate('coach', 'name specialite')
            .populate('membres', 'name email');
        res.status(200).json(seances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.inscrireMembre = async (req, res) => {
    try {
        const { seanceId } = req.params;
        const { membreId } = req.body;
        const seance = await Seance.findById(seanceId);
        if (!seance) {
            return res.status(404).json({ error: 'Seance not found' });
        }
        if (seance.membres.length >= seance.capacite) {
            return res.status(400).json({ error: 'Seance est complète' });
        }
        if (seance.membres.includes(membreId)) {
            return res.status(400).json({ error: 'Membre déjà inscrit' });
        }
        seance.membres.push(membreId);
        await seance.save();
        res.status(200).json({ message: 'Membre inscrit avec succès', seance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getSeancesByMembre = async (req, res) => {
    try {
        const { membreId } = req.params;
        const seances = await Seance.find({ membres: membreId })
            .populate('coach', 'name')
            .populate('programme', 'nom')
            .sort({ date: -1 })
            .limit(10);
        res.status(200).json(seances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};