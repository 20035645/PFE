const memberModel = require ('../models/member.model')
module.exports.getAllMembers = async (req,res) => {
    try{
        const members = await memberModel.find();
        res.status(200).json(members);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getMemberById = async (req,res) => {
    try{
        const {memberId} = req.params;
        const member = await memberModel.findById(memberId);
        res.status(200).json({message: 'Membre:', data: memberId});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.addMember = async (req,res) => {
    try{
        const {memberId,FaceID,memberName,statut,dateInscrit,numTelephone} = req.body;
        const newMember = new memberModel ({memberId,memberName,statut,dateInscrit,numTelephone});
        await newMember.save();
        res.status(201).json(newMember);
    }catch(error){
        res.status(500).json({error :error.message});
    }
};

module.exports.deleteMember = async (req,res) => {
    try{
        const { memberId } = req.params;
        const deletedMember = await memberModel.findByIdAndDelete(memberId);
        if (!deletedMember) {
            return res.status(404).json({error : "Member not found"});
        }
        res.status(200).json({message : "Member deleted successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.UpdateMember = async (req,res) => {
    try{
        const { memberId } = req.params;
        const { numTelephone,memberName } = req.body;
        const updatedMember = await memberModel.findByIdAndUpdate(
            memberId,
            {numTelephone,memberName},
            {new: true},
        );
        if (!updatedMember){
            return res.status(404).json({error: "Member not found"});
        }
        res.status(200).json({message: "Member updated successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}