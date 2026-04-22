const abonnementModel = require('../models/Abonnement.model');

module.exports.getAllAbonnements = async (req,res) => {
    try{
        const abonnements = await abonnementModel.find();
        res.status(200).json(abonnements);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getAbonnementById = async (req,res) => {
    try{
        const { abonnementId } = req.params;
        const abonnement = await abonnementModel.findById(abonnementId);
        res.status(200).json({message: 'Abonnement:', data: abonnementId});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}   

module.exports.addAbonnement = async (req,res) => {
    try{
        const { abonnementId, GymClass , price, duration } = req.body; 
        const newAbonnement = new abonnementModel({ abonnementId, GymClass , price, duration });
        await newAbonnement.save();
        res.status(201).json(newAbonnement);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.deleteAbonnement = async (req,res) => {
    try{
        const { abonnementId } = req.params;
        const deletedAbonnement = await abonnementModel.findByIdAndDelete(abonnementId);    
        if (!deletedAbonnement) {
            return res.status(404).json({error: "Abonnement not found"});
        }
        res.status(200).json({message: "Abonnement deleted successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.updateAbonnement = async (req,res) => {
    try{
        const { abonnementId } = req.params;
        const { GymClass, price, duration } = req.body;
        const updatedAbonnement = await abonnementModel.findByIdAndUpdate(
            abonnementId,
            { GymClass, price, duration },
            { new: true },
        );
        if (!updatedAbonnement) {
            return res.status(404).json({error: "Abonnement not found"});
        }
        res.status(200).json({message: "Abonnement updated successfully"});
    }   
    catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getAbonnementByPrice = async (req,res) => {
    try{
        const { price } = req.params;
        const abonnement = await abonnementModel.findOne({ price });
        if (!abonnement){
            return res.status(200).json({error: "Abonnement not found"});
        }
        res.status(200).json(abonnement);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getAbonnementByDuration = async (req,res) => {
    try{
        const { duration } = req.params;
        const abonnement = await abonnementModel.findOne({ duration });
        if (!abonnement){
            return res.status(200).json({error: "Abonnement not found"});
        }
        res.status(200).json(abonnement);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getAbonnementByGymClass = async (req,res) => {
    try{
        const { GymClass } = req.params;
        const abonnement = await abonnementModel.findOne({ GymClass });
        if (!abonnement){
            return res.status(200).json({error: "Abonnement not found"});
        }
        res.status(200).json(abonnement);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

