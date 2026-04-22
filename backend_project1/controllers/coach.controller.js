const coachModel = require('../models/coach.model')

module.exports.getAllCoachs = async (req, res) => {
    try {
        const coachs = await coachModel.find();
        res.status(200).json(coachs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getCoachById = async(req,res) => {
    try{
        const {coachId} =req.params;
        const coach = await coachModel.findById(coachId);
        res.status(200).json({message: 'Coach:', data: coachId});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.addCoach = async (req, res) => {
    try {
        const {coachName, speciality} = req.body;
        const newCoach = new coachModel({ coachId, FaceID , coachName, speciality });
        await newCoach.save();
        res.status(201).json(newCoach);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports.deleteCoach = async (req, res) => {
    try {
        const { coachId } = req.params;
        const deletedCoach = await coachModel.findByIdAndDelete(coachId);
        if (!deletedCoach) {
            return res.status(404).json({ error: "Coach not found" });
        }
        res.status(200).json({ message: "Coach deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.UpdateCoach = async (req, res) => {
    try {
        const { coachId } = req.params;
        const { numTelephone, location } = req.body;
        const updatedCoach = await coachModel.findByIdAndUpdate(
            coachId,
            { numTelephone, location },
            { new: true },
        );
        if (!updatedCoach) {
            return res.status(404).json({ error: "Coach not found" });
        }
        res.status(200).json({ message: "Coach updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.addCoachWithPhoto = async (req, res) => {
    try {
        const { coachName, speciality } = req.body;
        const photo = req.file ? req.file.path : null;
        const newCoach = new coachModel({ coachName, speciality, photo });
        await newCoach.save();
        res.status(201).json(newCoach);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}