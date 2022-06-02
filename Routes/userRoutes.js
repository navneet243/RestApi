const router = require('express').Router()
const userController = require('../Controller/userCtrl')
const auth = require('../Middleware/auth')

// to register user
router.post('/register',userController.registerUser); 

// to login user
router.post('/login',userController.loginUser); 

// to get user details
router.route("/userdetails/:id")
    .get(auth, userController.getDetails);

// to get all userlist
router.route("/userlist")
    .get(auth,userController.getUserlist)
    
module.exports = router;