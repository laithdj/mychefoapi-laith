const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const { Coupon } = require('../models');

const ApiError = require('../utils/ApiError');


/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCoupon = async (couponBody) => {
    console.log('coupon Body ', couponBody);
    // const res = await couponBody.save();

    return Coupon.create(couponBody);
    // return res;
};


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const getCoupen = async (id) => {
    return Coupon.find( { channel_id: id  } );

  };


//   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
/**
 * Get Course by id
 * @param {ObjectId} id
 * @returns {Promise<Coupon>}
 */
 const getCoupenById = async (id) => {
    return Coupon.findById(id);
};



//   ++++++++++++++++++++++++++++++++++++++++++Update Coupen By Id ++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} Body
 * @returns {Promise<Coupon>}
 */

const updateCoupenById = async (id, Body) => {
    const coupen = await getCoupenById(id);

    console.log(coupen)
    if (!coupen) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Coupen not found');
    }

    Object.assign(coupen, Body.param);
    await coupen.save();
    return coupen;
};

//   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


module.exports = {
    createCoupon,
    getCoupen,
    updateCoupenById
    // getCourseById,
    // updateCourseById,
    // getCourseByUserId,
    // getCourses,
    // searchCourse
};
