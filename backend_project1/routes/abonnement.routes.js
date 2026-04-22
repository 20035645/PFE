const express = require('express');
const router = express.Router();
const abonnementcontroller = require('../controllers/abonnement.controller');

router.get('/getAllAbonnements', abonnementcontroller.getAllAbonnements);
router.get('/getAbonnementById/:abonnementId', abonnementcontroller.getAbonnementById);
router.post('/addAbonnement', abonnementcontroller.addAbonnement);
router.delete('/deleteAbonnement/:abonnementId', abonnementcontroller.deleteAbonnement);
router.put('/updateAbonnement/:abonnementId', abonnementcontroller.updateAbonnement);
router.get('/getAbonnementsByPrice', abonnementcontroller.getAbonnementByPrice);
router.get('/getAbonnementsByDuration', abonnementcontroller.getAbonnementByDuration);
router.get('/getAbonnementsByGymClass/:classId', abonnementcontroller.getAbonnementByGymClass);

module.exports = router;