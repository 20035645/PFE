const gymClassModel = require ('../models/gymclass.model');

module.exports.getAllGymClasses = async (req,res) => {
    try{
        const gymclasses = await gymClassModel.find();
        res.status(200).json(gymclasses);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getGymClassById = async (req,res) => {
    try{
        const { id } = req.params;
        const gymclass = await gymClassModel.findById(id);  
        if (!gymclass) {
            return res.status(404).json({error: "GymClass not found"});
        }   
        res.status(200).json(gymclass);
    }catch(error){
        res.status(500).json({error: error.message});
    }   
}

module.exports.addGymClass = async (req,res) => {
    try{
        const {classId,className,coachId} = req.body; 
        const newGymClass = new gymClassModel({
            classId,
            className, 
            coachId,
        });
        await newGymClass.save();
        res.status(201).json(newGymClass);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}     

module.exports.deleteGymClass = async (req,res) => {
    try{
        const { id } = req.params;  
        const deletedGymClass = await gymClassModel.findByIdAndDelete(id);
        if (!deletedGymClass) {
            return res.status(404).json({error: "GymClass not found"});
        }
        res.status(200).json({message: "GymClass deleted successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }   
}

module.exports.updateGymClass = async (req,res) => {
    try{
        const { id } = req.params;
        const { classId, className, coachId } = req.body;
        const updatedGymClass = await gymClassModel.findByIdAndUpdate(
            id,
            { classId, className, coachId },    
            { new: true }
        );      
        if (!updatedGymClass) {
            return res.status(404).json({error: "GymClass not found"});
        }
        res.status(200).json(updatedGymClass);
    }catch(error){
        res.status(500).json({error: error.message});          
    }
}

module.exports.getGymClassByCoachId = async (req,res) => {
    try{
        const { coachId } = req.body;
        const gymclasses = await gymClassModel.find({ coachId });
        res.status(200).json(gymclasses);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getGymClassByClassName = async (req,res) => {
    try{
        const { className } = req.body;   
        const gymclasses = await gymClassModel.find({ className });
        res.status(200).json(gymclasses);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getGymClassByPrice = async (req,res) => {
    try{
        const { price } = req.body;
        const gymclasses = await gymClassModel.find({ price });
        res.status(200).json(gymclasses);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

