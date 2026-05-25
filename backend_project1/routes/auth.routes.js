var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/user.controller');

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);

module.exports = router;
