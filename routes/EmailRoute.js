const express = require('express');
const router = express.Router();
const controller = require('../controllers/EmailController');

router.post('/sendEmail', controller.send_email)

module.exports = router;
