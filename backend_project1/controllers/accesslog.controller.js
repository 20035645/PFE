const accesslogModel = require('../models/accesslog.model');

module.exports.getAllAccessLogs = async (req,res) => {
    try{
        const accesslogs = await accesslogModel.find(); 
        res.status(200).json(accesslogs);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getAccessLogById = async (req,res) => {
    try{
        const { accessLogId } = req.params;     
        const accesslog = await accesslogModel.findById(accessLogId);
        if (!accesslog) {
            return res.status(404).json({error: "AccessLog not found"});
        }   
        res.status(200).json(accesslog);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.addAccessLog = async (req,res) => {
    try{
        const { cameraId, FaceID , accessTime } = req.body; 
        const newAccessLog = new accesslogModel({ cameraId, accessTime });
        await newAccessLog.save();
        res.status(201).json(newAccessLog);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.deleteAccessLog = async (req,res) => {
    try{
        const { accessLogId } = req.params;
        const deletedAccessLog = await accesslogModel.findByIdAndDelete(accessLogId);
        if (!deletedAccessLog) {
            return res.status(404).json({error: "AccessLog not found"});
        }
        res.status(200).json({message: "AccessLog deleted successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.updateAccessLog = async (req,res) => {
    try{
        const { accessLogId } = req.params;
        const { cameraId, FaceID , accessTime } = req.body;
        const updatedAccessLog = await accesslogModel.findByIdAndUpdate(
            accessLogId,
            { cameraId, accessTime },
            { new: true },
        );
        if (!updatedAccessLog) {
            return res.status(404).json({error: "AccessLog not found"});
        }
        res.status(200).json({message: "AccessLog updated successfully"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}


    

