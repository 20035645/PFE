const express = require('express');
const router = express.Router();
const programmeController = require('../controllers/programme.controller');

router.get('/getAllProgrammes', programmeController.getAllProgrammes);
router.get('/getProgrammeById/:programmeId', programmeController.getProgrammeById);
router.post('/addProgramme', programmeController.addProgramme);
router.delete('/deleteProgramme/:programmeId', programmeController.deleteProgramme);
router.put('/updateProgramme/:programmeId', programmeController.updateProgramme);

module.exports = router;
