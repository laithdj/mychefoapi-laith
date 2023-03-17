const express = require('express');
// const validate = require('../../middlewares/validate');
const validate = require('../../middlewares/validate');
const couponValidation = require('../../validations/coupon.validation');
const couponController = require('../../controllers/coupon.controller');
const auth = require('../../middlewares/auth');
const { couponService } = require('../../services');

const router = express.Router();


router
    .route('/')
    // .get(auth(), couponController.getCourses), removed auth in post
    .post(auth(), couponController.addCoupon)


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router
    .route('/getCoupenDetails//:channel_id')
    .get(couponController.getCoupenDetails);


router
    .route('/:id')
    .get(couponController.updateCoupen)
    .patch(auth(), couponController.updateCoupen) ;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;