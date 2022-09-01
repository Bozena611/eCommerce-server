const express = require('express');
const router = express.Router();
const controller = require('../controllers/AdminController');
//const bodyParser = require ('body-parser');


// register admin
router.post('/admin/register', controller.registerAdmin); 

// login admin get? send token to verify new admin, they put post
router.post('/admin/login', controller.loginAdmin); 

// verify token *** remove?? ***
router.post('/admin/verify_token', controller.verify_token); 





module.exports = router;