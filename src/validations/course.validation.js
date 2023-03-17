const Joi = require('joi');
const { password } = require('./custom.validation');

const addCourse = {
  body: Joi.object().keys({
    title: Joi.string().required().min(6),
    catagory: Joi.string().required(),
    time: Joi.string().required(),
    type: Joi.string().required(),
  }),
};
const updateCourse = {
  body: Joi.object().keys({
    title: Joi.string().required().min(6),
    catagory: Joi.string().required(),
    time: Joi.string().required(),
    type: Joi.string().required(),
  }),
};

const updateCourseBasicInfo = {
  body: Joi.object().keys({
    basicInfo: Joi.object().keys({
      title: Joi.string().required().min(6),
      catagory: Joi.string().required(),
      description: Joi.string().required(),
      subtitle: Joi.string().required(),
      subcatagory: Joi.string().required(),
      language: Joi.string().required(),
      level: Joi.string().required(),
      primaryInfo: Joi.string().required(),
    })
  }),
};

const updateCourseGoals = {
  body: Joi.object().keys({
    goals: Joi.object().keys({
      what_you_will_learn: Joi.array().required().min(4),
      requirements: Joi.array().required().min(1),
      who_should_attend: Joi.array().required().min(1),
    })
  }),
  params: Joi.object().keys({
    courseId: Joi.string().required()
  })
};



const updateCourseMessages = {
  body: Joi.object().keys({
    messages: Joi.object().keys({
        welcome: Joi.string().required(),
        congrats: Joi.string().required(),
      })
  }),
  params: Joi.object().keys({
    courseId: Joi.string().required()
  })
};

const updateCourseCurriculam = {
  body: Joi.object().keys({
    title: Joi.string().required().min(6),
    catagory: Joi.string().required(),
    time: Joi.string().required(),
    type: Joi.string().required(),
  }),
};
const searchCourse = {
  params: Joi.object().keys({
    query: Joi.string().required(),
  }),
};

module.exports = {
  addCourse,
  updateCourse,
  updateCourseBasicInfo,
  updateCourseGoals,
  updateCourseMessages,
  updateCourseCurriculam,
  searchCourse

};
