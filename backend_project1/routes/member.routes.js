const express = require ('express');
const router =  express.Router();
const membercontroller = require('../controllers/member.controller');

router.get('/getAllMembers', membercontroller.getAllMembers);
router.get('/getMemberById/:memberId', membercontroller.getMemberById);
router.post('/addMember', membercontroller.addMember);
router.delete('/deleteMember/:memberId', membercontroller.deleteMember);
router.put('/updateMember/:memberId', membercontroller.UpdateMember);       


module.exports = router;
