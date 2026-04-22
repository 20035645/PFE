const express = require('express');
const router = express.Router();
const accesslogcontroller = require('../controllers/accesslog.controller');

router.get('/getAllAccessLogs',accesslogcontroller.getAllAccessLogs);
router.get('/getAccessLogById/:logId',accesslogcontroller.getAccessLogById);
router.post('/addAccessLog',accesslogcontroller.addAccessLog);
router.delete('/deleteAccessLog/:logId',accesslogcontroller.deleteAccessLog);
router.put('/updateAccessLog/:logId',accesslogcontroller.updateAccessLog);

module.exports = router;