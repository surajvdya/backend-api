const express = require('express');
const userController = require('../controller/userController');
const upload = require('../controller/upload');
const auth=require('../auth');

const router = express.Router();

// router.get("/signup",userController.signup);

router.route("/signup")
.get((req,res)=>{
    res.send("SIGNUP")
})
.post(upload,userController.signup)


router.route("/login")
.post(userController.login);


//Route for update user
router.patch('/update/:_id',upload,userController.update);


router.delete('/delete/:_id',userController.delete);

router.get("/me",auth.verifyUser,userController.me);

module.exports = router