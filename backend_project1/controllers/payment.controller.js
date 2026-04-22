const paymentModel = require('../models/payment.model');

module.exports.getAllPayments = async (req,res) => {
    try{
        const payments = await paymentModel.find();
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getPaymentById = async (req,res) => {
    try{
        const { paymentId } = req.params; 
        const payment = await paymentModel.findById(paymentId);
        res.status(200).json({message: 'Payment:', data: paymentId});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.addPayment = async (req,res) => {
    try{
        const { paymentId, memberId, price, date } = req.body;
        const newPayment = new paymentModel({ paymentId, memberId, price, date });
        await newPayment.save();
        res.status(201).json(newPayment);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.deletePayment = async (req,res) => {
    try{
        const { paymentId } = req.params;
        const deletedPayment = await paymentModel.findByIdAndDelete(paymentId);
        if (!deletedPayment) {
            return res.status(404).json({error: "Payment not found"});
        }
        res.status(200).json({message: "Payment deleted successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }   
}

module.exports.updatePayment = async (req,res) => {
    try{
        const { paymentId } = req.params;
        const { memberId, price, date } = req.body;
        const updatedPayment = await paymentModel.findByIdAndUpdate(
            paymentId,
            { memberId, price, date },
            { new: true },
        );
        if (!updatedPayment) {
            return res.status(404).json({error: "Payment not found"});
        }
        res.status(200).json({message: "Payment updated successfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getPaymentByGymClassId = async (req,res) => {
    try{
        const { gymClassId } = req.params;
        const payments = await paymentModel.find({ gymClassId });
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getPaymentByDate = async (req,res) => {
    try{
        const { date } = req.body;
        const payments = await paymentModel.find({ date });
        res.status(200).json(payments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

