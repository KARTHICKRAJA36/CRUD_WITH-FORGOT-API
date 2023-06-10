const router = require("express").Router();
const userdetail = require("../controllers/read")
const admindetail = require("../controllers/adminlogin")
const checktoken = require("../middleware/authorization")
const upload = require("../middleware/fileupload")
const fileupload = require("../controllers/fileupload")
const { validateUserRegistration } = require("../middleware/validation")
const { validateUserUpdate } = require("../middleware/updateValidation")
const usercontrol = require("../controllers/create")
const updatecontroller = require("../controllers/update")
const deletecontrol = require("../controllers/delete")
const userlogin = require("../controllers/userlogin")
const checkuserToken = require("../controllers/userdata")
const authcontrols=require("../controllers/authcontrols")


router.post('/adminlogin', admindetail)
router.get('/read', checktoken, userdetail)
router.post('/create', checktoken, validateUserRegistration, usercontrol.createUserWithQualificationAndAddress);
router.put('/update/:id', checktoken, validateUserUpdate, updatecontroller.updateUserWithQualificationAndAddress)
router.delete('/delete/:id', checktoken, deletecontrol.deleteUserWithQualificationAndAddress)
router.post('/fileupload/:id', checktoken, upload, fileupload)
router.post('/userlogin', userlogin)
router.get('/userdata', checkuserToken)
router.post('/forgotPassword',authcontrols.forgotPassword)
router.post('/resetPassword',authcontrols.resetPassword)

module.exports = router;
