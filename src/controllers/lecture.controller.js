const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { lectureService } = require('../services');
const config = require('./../config/config');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const path = require('path');


const addLecture = catchAsync(async (req, res) => {

    const lecture = await lectureService.createLecture(req.body);

    res.status(httpStatus.CREATED).send({lecture});
});


const updateLecture = catchAsync(async (req, res) => {

    const lecture = await lectureService.updateLecture(req.params.lectureId, req.body);

    res.send(lecture);
});


const deleteLecture = catchAsync(async (req, res) => {
    const lecture = await lectureService.deleteLectureById(req.params.id);

    let mediaPath = lecture.media;

    if (mediaPath) {
        let absolutePath = path.resolve(`${__dirname}./../../${config.storage.baseUrl}/${mediaPath}`);
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
        }
    }

    res.status(httpStatus.NO_CONTENT).send();
});


const getLecture = catchAsync(async (req, res) => {

    const lecture = await lectureService.getLectureById(req.body);

    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'lecture not found');
    }
    res.send(lecture);
});




module.exports = {
    addLecture,
    updateLecture,
    deleteLecture,
    getLecture
};
