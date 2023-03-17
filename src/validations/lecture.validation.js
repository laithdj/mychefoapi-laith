const Joi = require('joi');

const addLecture = {
  body: Joi.object().keys({
    title: Joi.string().required().min(6),
    order: Joi.number().required(),
    description: Joi.string(),
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
  }),
};


const updateLecture = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    order: Joi.string().required(),
    description: Joi.string(),
    courseId: Joi.string().required(),
    chapterId: Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
};


const getLecture = {
  params: Joi.object().keys({
    lectureId: Joi.string().required(),
  })
};


const deleteLecture = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
};


module.exports = {
  addLecture,
  updateLecture,
  getLecture,
  deleteLecture

};
