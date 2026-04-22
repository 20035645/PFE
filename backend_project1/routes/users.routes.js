var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/user.controller');
const uploadefile = require('../middleware/upload.file');

/* GET users listing. */
//router.get('/esm', usercontroller.esm);
router.get('/getAllUsers' , usercontroller.getAllUsers);
router.post('/addUser' , usercontroller.addUser);
router.post('/addAdmin',usercontroller.addAdmin);
router.delete('/deleteUser/:id',usercontroller.deleteUser);
router.put('/updateUser/:id',usercontroller.updateUser);
router.post('/addUserwithPhoto',uploadefile.single('photo'),usercontroller.addUserwithPhoto);

module.exports = router;
