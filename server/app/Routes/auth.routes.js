const express = require('express');
const router = express.Router();
const { authMiddleware }= require ('../Middleware/authMiddleWare');
const authController = require('../Controller/authController');

router.post('/login',authController.login);
router.post('/signup',authController.signup);
router.post('/verify',authController.sendVerifyToken);

router.get('/authtoken',authMiddleware,(req,res)=>{
    res.sendStatus(200);
});

module.exports = router;