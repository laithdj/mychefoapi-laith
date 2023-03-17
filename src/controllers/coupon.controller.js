const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { couponService } = require('../services');
const pick = require('../utils/pick');
const { serializeToJson, serializeCourseList } = require('../utils/json-serializer');


const addCoupon = catchAsync(async (req, res) => {
    const coupon = await couponService.createCoupon(req.body);
    console.log('coupon : ', coupon);
    res.status(httpStatus.CREATED).send(coupon);
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const getCoupenDetails = catchAsync(async (req, res) => {
    // console.log(req.user,"USER");
    // console.log(req.body,"BODY")

    console.log(req.params.channel_id,"CHANNEL")
    const coupen = await couponService.getCoupen(req.params.channel_id)
    if (!coupen) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Coupen not found');
    }
    res.send(coupen);
  });

//   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



const updateCoupen = catchAsync(async (req, res) => {
    const { id } = req.params;
  const coupen = await couponService.updateCoupenById(id, req.body);
    if (!coupen) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Coupen not found');
            }
    res.send({ coupen });
});









module.exports = {
    addCoupon,
    getCoupenDetails,
    updateCoupen
};
