const httpStatus = require('http-status');
const { Catagory } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Return catagory list
 * @returns {Promise<Catagory[]>}
 */
const getCatagories = async () => {
  return Catagory.find();
};




module.exports = {
  getCatagories,
};
