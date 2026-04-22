const express = require('express');
const router = express.Router();
const paymentcontroller = require('../controllers/payment.controller');

router.get('/getAllPayments',paymentcontroller.getAllPayments);
router.get('/getPaymentById/:paymentId',paymentcontroller.getPaymentById);
router.post('/addPayment',paymentcontroller.addPayment);
router.delete('/deletePayment/:paymentId',paymentcontroller.deletePayment);
router.put('/updatePayment/:paymentId',paymentcontroller.updatePayment);
router.get('getPaymentByDate/:date',paymentcontroller.getPaymentByDate);
router.get('getPaymentByGymClassId/:gymclassId',paymentcontroller.getPaymentByGymClassId);

module.exports = router;