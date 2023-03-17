const Joi = require('joi');
const { password } = require('./custom.validation');

const addCoupon = {
  body: Joi.object().keys({
    coupenId: Joi.string().required(),
    discount: Joi.string().required()
  }),
};

module.exports = {
  addCoupon,
  // updateCourse,
  // updateCourseBasicInfo,
  // updateCourseGoals,
  // updateCourseMessages,
  // updateCourseCurriculam,
  // searchCourse

};
