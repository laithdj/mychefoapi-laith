const express = require("express");
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();


router
    .route('/checkout')
    .post(paymentController.makePayment);


module.exports = router;