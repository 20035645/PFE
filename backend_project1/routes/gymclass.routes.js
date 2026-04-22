const express = require('express');
const router = express.Router();
const gymclasscontroller = require('../controllers/GymClass.controller');

router.get('/getAllGymClasses', gymclasscontroller.getAllGymClasses);
router.get('/getGymClassById/:classId', gymclasscontroller.getGymClassById);
router.post('/addGymClass', gymclasscontroller.addGymClass);
router.delete('/deleteGymClass/:classId', gymclasscontroller.deleteGymClass);
router.put('/updateGymClass/:classId', gymclasscontroller.updateGymClass);
router.get('/getGymClassesByCoach/:coachId', gymclasscontroller.getGymClassByCoachId);
router.get('/getGymClassesByClassName/:classname', gymclasscontroller.getGymClassByClassName);
router.get('/getGymClassesByPrice', gymclasscontroller.getGymClassByPrice);

module.exports = router;