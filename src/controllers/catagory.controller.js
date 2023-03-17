const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { catagoryService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { serializeToJson } = require('../utils/json-serializer');



const getCatagories = catchAsync(async (req, res) => {

    const catagories = await catagoryService.getCatagories();

    res.status(httpStatus.CREATED).send({ catagories });
});





module.exports = {
    getCatagories,
};
