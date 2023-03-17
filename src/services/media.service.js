const { courseService } = require('./index');
const lectureService = require('./lecture.service')
const { fileTypes } = require('./../config/multer');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');




/**
 * Return path of public file
 * @param {String} mediaType
 * @param {String} id
 * @returns {String} file path
 */
const getFilePath = async (type, id) => {
    let path = ''
    switch (type) {
        case fileTypes.courseImage:
        case fileTypes.courseVideo: {

            let course = await courseService.getCourseById(id);

            if (!course) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
            }

            path = (type === fileTypes.courseImage) ? course?.image : course?.promoVideo;
            break;
        }

        case fileTypes.courseMaterial: {
            let lecture = await lectureService.getLectureById(id);

            if (!lecture) {
                throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
            }

            path = lecture?.media;
            break;
        }

        default:
            break;
    }
    return path;
};


/**
 * Return newly updated path of file
 * @param {String} mediaType
 * @param {String} id
 * @param {String} path
 * @param {String} origionalFileName
 * @returns {String} new file path
 */
const updateMediaPath = async (type, id, path, orgionalFileName = '') => {
    switch (type) {
        case fileTypes.courseImage:
        case fileTypes.courseVideo:
            {

                let newField = (type === fileTypes.courseImage) ? 'image' : 'promoVideo';
                let newObj = {};
                newObj[newField] = path;
                let oldCourse = await courseService.getCourseById(id);
                let oldPath = oldCourse[newField];
                let course = await courseService.updateCourseById(id, newObj);
                return { oldPath, newPath : course[newField]};
            }

        case fileTypes.courseMaterial: {
            let lecture = await lectureService.getLectureById(id);
            let oldPath = lecture.media;

            Object.assign(lecture, { media: path, filename: orgionalFileName });
            lecture.save();

            return {oldPath, newPath: path};
        }

        default:
            return ''
    }
};





module.exports = {
    getFilePath,
    updateMediaPath
};
