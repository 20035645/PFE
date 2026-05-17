const express = require('express');
const router = express.Router();
const progressionController = require('../controllers/progression.controller');

router.get('/getAllProgressions', progressionController.getAllProgressions);
router.get('/getProgressionById/:progressionId', progressionController.getProgressionById);
router.post('/addProgression', progressionController.addProgression);
router.delete('/deleteProgression/:progressionId', progressionController.deleteProgression);
router.put('/updateProgression/:progressionId', progressionController.updateProgression);

module.exports = router;