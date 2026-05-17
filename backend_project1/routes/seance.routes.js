const express = require('express');
const router = express.Router();
const seanceController = require('../controllers/seance.controller');

router.get('/getAllSeances', seanceController.getAllSeances);
router.get('/getSeanceById/:seanceId', seanceController.getSeanceById);
router.get('/getSeancesByProgramme/:programmeId', seanceController.getSeancesByProgramme);
router.post('/addSeance', seanceController.addSeance);
router.post('/inscrireMembre/:seanceId', seanceController.inscrireMembre);
router.delete('/deleteSeance/:seanceId', seanceController.deleteSeance);
router.get('/getSeancesByMembre/:membreId', seanceController.getSeancesByMembre);

module.exports = router;