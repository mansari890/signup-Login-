const router = require('express').Router();
const {signup, login}=require('../controllers/AuthController.js');
const {signupValidation, loginValidation} = require('../middleware/AuthValidation.js');


  
router.post('/signup',signupValidation, signup);
router.post('/login',loginValidation, login);



module.exports = router;