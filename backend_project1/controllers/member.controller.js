const memberModel = require('../models/member.model');

// ── existants ──────────────────────────────────────────────

module.exports.getAllMembers = async (req, res) => {
    try {
        const members = await memberModel.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ fix : retournait memberId au lieu de member
module.exports.getMemberById = async (req, res) => {
    try {
        const { memberId } = req.params;
        const member = await memberModel.findById(memberId);
        if (!member) return res.status(404).json({ error: "Member not found" });
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ fix : utilise les vrais champs du modèle (name, email, password...)
module.exports.addMember = async (req, res) => {
    try {
        const { name, email, password, phone, age, objectif, abonnementType, dateDebut, dateFin, price } = req.body;
        const newMember = new memberModel({
            name, email, password, phone, age,
            objectif, abonnementType, dateDebut, dateFin, price,
            status: 'pending', // tout nouveau membre = en attente
        });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const deletedMember = await memberModel.findByIdAndDelete(memberId);
        if (!deletedMember) return res.status(404).json({ error: "Member not found" });
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ fix : retourne le membre mis à jour
module.exports.UpdateMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { name, phone, age, objectif, abonnementType, dateDebut, dateFin, price, coachAssigned } = req.body;
        const updatedMember = await memberModel.findByIdAndUpdate(
            memberId,
            { name, phone, age, objectif, abonnementType, dateDebut, dateFin, price, coachAssigned },
            { new: true }
        );
        if (!updatedMember) return res.status(404).json({ error: "Member not found" });
        res.status(200).json({ message: "Member updated successfully", data: updatedMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ── nouvelles fonctions ────────────────────────────────────

// GET /api/members/getByStatus?status=pending
module.exports.getMembersByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const members = await memberModel.find(filter).sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PATCH /api/members/updateStatus/:memberId
// body: { status: 'active' | 'rejected' | 'pending' }
module.exports.updateMemberStatus = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { status } = req.body;

        if (!['pending', 'active', 'rejected'].includes(status)) {
            return res.status(400).json({ error: "Statut invalide. Valeurs: pending | active | rejected" });
        }

        const member = await memberModel.findByIdAndUpdate(
            memberId,
            { status },
            { new: true }
        );
        if (!member) return res.status(404).json({ error: "Member not found" });

        res.status(200).json({
            message: `Membre ${status === 'active' ? 'accepté' : status === 'rejected' ? 'refusé' : 'mis en attente'}`,
            data: member,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};