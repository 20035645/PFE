const express = require('express');
const router = express.Router();
const fitnessprofilecontroller = require('../controllers/fitnessprofile.controller');

router.get('/getAllFitnessProfiles', fitnessprofilecontroller.getAllFitnessProfiles);
router.get('/getFitnessProfileById/:profileId', fitnessprofilecontroller.getFitnessProfileById);
router.post('/addFitnessProfile', fitnessprofilecontroller.addFitnessProfile);
router.delete('/deleteFitnessProfile/:profileId', fitnessprofilecontroller.deleteFitnessProfile);
router.put('/updateFitnessProfile/:profileId', fitnessprofilecontroller.updateFitnessProfile);
router.get('/getFitnessProfilesByMember/:memberId', fitnessprofilecontroller.getFitnessProfileByMemberId);
router.get('/getFitnessProfilesByWeight/:weight', fitnessprofilecontroller.getFitnessProfileByWeight);

module.exports = router;