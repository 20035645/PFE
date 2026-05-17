var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/user.controller');

router.get('/getAllUsers', usercontroller.getAllUsers);
router.get('/getMembres', usercontroller.getMembres);
router.get('/getCoaches', usercontroller.getCoaches);
router.get('/getUserById/:id', usercontroller.getUserById);
router.post('/addUser', usercontroller.addUser);
router.post('/login', usercontroller.login);
router.post('/register', usercontroller.register);
router.put('/updateUser/:id', usercontroller.updateUser);
router.delete('/deleteUser/:id', usercontroller.deleteUser);

module.exports = router;