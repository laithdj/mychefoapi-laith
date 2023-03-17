const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 */
const createCourse = async (courseBody) => {
    return Course.create(courseBody);
};


/**
 * Get Course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 */
const getCourseById = async (id) => {
    console.log('getCourseById',id);
    return Course.findById(id);
};


/**
 * Get Course by user id
 * @param {ObjectId} userId
 * @returns {Promise<Course[]>}
 */
const getCourseByUserId = async (id) => {
    return Course.find({ userId: id });
};


/**
 * Get Course by filter string
 * @param {ObjectId} searchString
 * @returns {Promise<Course[]>}
 */
const searchCourse = async (searchString) => {
    return Course.find({
            '$or': [
            { title: { $regex: searchString, "$options": "i" },  },
            { subtitle: { $regex: searchString, "$options": "i" }, },
            { author: { $regex: searchString, "$options": "i" }, }
            ]
        });
};



/**
 * Get Courses
 * @returns {Promise<Course[]>}
 */
const getCourses = async () => {
    return Course.find();
};


/**
 * Update user by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 */
// not using now, now channel wise updation
const updateCourseById = async (courseId, updateBody) => {
    console.log('updateCourseById');
    const course = await getCourseById(courseId);
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    Object.assign(course, updateBody);
    await course.save();
    return course;
};


module.exports = {
    createCourse,
    getCourseById,
    updateCourseById,
    getCourseByUserId,
    getCourses,
    searchCourse
};
