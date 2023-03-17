const Joi = require('joi');

const addChapter = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    order: Joi.number(),
    description: Joi.string(),
    courseId: Joi.string().required(),
  }),
};


const getChapter = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};


const updateChapter = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    order: Joi.string().required(),
    description: Joi.string(),
    courseId: Joi.string().required(),
  }),
};


const deleteChapter = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};



module.exports = {
  addChapter,
  getChapter,
  updateChapter,
  deleteChapter
};
