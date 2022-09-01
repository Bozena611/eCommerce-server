const express = require('express');
const router = express.Router();
const controller = require('../controllers/PaymentController');

router.post("/payment", controller.payment);

module.exports = router;