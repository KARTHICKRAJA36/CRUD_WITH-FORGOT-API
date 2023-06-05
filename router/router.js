const router=require("express").Router();
const userdetail=require("../controllers/Admincontrol")
const admindetail=require("../controllers/adminlogin")
const checktoken=require("../middleware/login")
const upload=require("../middleware/fileupload")
const {validateUserRegistration}=require("../middleware/validation")
const {validateUserUpdate}=require("../middleware/updateValidation")
const usercontrol=require("../controllers/adduser")
const updatecontroller=require("../controllers/update")
const deletecontrol=require("../controllers/delete")
const userlogin=require("../controllers/userlogin")
const checkuserToken=require("../controllers/userdata")


router.post('/adminlogin',admindetail)
router.get('/allusers',checktoken,userdetail)
router.post('/createuser',checktoken,upload,validateUserRegistration,usercontrol.createUserWithQualificationAndAddress);
router.put('/updateuser/:id',checktoken,upload,validateUserUpdate,updatecontroller.updateUserWithQualificationAndAddress)
router.delete('/deleteuser/:id',checktoken,deletecontrol.deleteUserWithQualificationAndAddress) 
router.post('/userlogin',userlogin) 
router.get('/userdata',checkuserToken)
    
module.exports = router;
