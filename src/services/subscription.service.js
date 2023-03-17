const httpStatus = require('http-status');
const { object } = require('joi');
const config = require('../config/config');
const logger = require('../config/logger');
const { Subscription } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a subscription
 * @param {Object} subscriptionBody
 * @returns {Promise<Subsciption>}
 */
const createSubsciption = async (subscriptionBody) => {
    console.log('createSubsciption service');
    const subscribe = await Subscription.find({studentId : {$eq: subscriptionBody.studentId}, channel_id: {$eq: subscriptionBody.channel_id}}); 
    if(!subscribe[0])
    return Subscription.create(subscriptionBody);
    else
    return Subscription.updateMany({ studentId:subscriptionBody.studentId,channel_id:subscriptionBody.channel_id},subscriptionBody);
}
/**
 * Get Course by id
 * @param {ObjectId} studentId
 * @returns {Promise<Subscription>}
 */
const getSubscriptionByStudentId = async (studentId) => {
    console.log('getSubscriptionByStudentId Service:',studentId );
    // add another condition, fetch only those that has date of subscription, startdate,end_date.
    return Subscription.find({ studentId:studentId});
};


/**
 * Get Course by user id
 * @param {ObjectId} userId
 * @returns {Promise<Course[]>}
 */
// const getCourseByUserId = async (id) => {
//     return Course.find({ userId: id });
// };


/**
 * Get Course by filter string
 * @param {ObjectId} searchString
 * @returns {Promise<Course[]>}
 */
// const searchCourse = async (searchString) => {
//     return Course.find({
//             '$or': [
//             { title: { $regex: searchString, "$options": "i" },  },
//             { subtitle: { $regex: searchString, "$options": "i" }, },
//             { author: { $regex: searchString, "$options": "i" }, }
//             ]
//         });
// };



/**
 * Get Courses
 * @returns {Promise<Course[]>}
 */
// const getCourses = async () => {
//     return Course.find();
// };


/**
 * Update user by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 */
// const updateCourseById = async (courseId, updateBody) => {
//     const course = await getCourseById(courseId);
//     if (!course) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
//     }

//     Object.assign(course, updateBody);
//     await course.save();
//     return course;
// };


module.exports = {
    createSubsciption,
    getSubscriptionByStudentId,
    // updateCourseById,
    // getCourseByUserId,
    // getCourses,
    // searchCourse
};
