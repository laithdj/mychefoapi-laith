const Joi = require('joi');

const getCatagory = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};



module.exports = {
  getCatagory
};
