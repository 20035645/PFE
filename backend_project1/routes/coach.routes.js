const express = require('express');
const router = express.Router();
const coachcontroller = require('../controllers/coach.controller');

router.get('/getAllCoaches', coachcontroller.getAllCoachs);
router.get('/getCoachById/:coachId', coachcontroller.getCoachById);      // getCoachbyId ❌ → getCoachById ✅
router.post('/addCoach', coachcontroller.addCoach);                       // addcoach ❌ → addCoach ✅
router.delete('/deleteCoach/:coachId', coachcontroller.deleteCoach);
router.put('/updateCoach/:coachId', coachcontroller.UpdateCoach);

module.exports = router;