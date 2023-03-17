const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Lecture = require('../models/lecture.model');


/**
 * Create a lecture
 * @param {Object} lectureBody
 * @returns {Promise<Lecture>}
 */
const createLecture = async (lectureBody) => {
  return Lecture.create(lectureBody);
};


/**
 * Get lecture by id
 * @param {ObjectId} id
 * @returns {Promise<Lecture>}
 */
const getLectureById = async (id) => {
  return Lecture.findById(id);
};


/**
 * Get lecture by chapterId
 * @param {ObjectId} chapterId
 * @returns {Promise<Lecture[]>}
 */
const getLecturesByChapterId = async (id) => {
  return Lecture.find({chapterId: id});
};


/**
 * Delete lecture by id
 * @param {ObjectId} id
 * @returns {Promise<Lecture>}
 */
const deleteLectureById = async (id) => {
  let lecture = await getLectureById(id);

  if (!lecture) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
  }

  await lecture.remove()

  return lecture;
};



/**
 * Update lecture by id
 * @param {ObjectId} lectureId
 * @param {Object} updateBody
 * @returns {Promise<Lecture>}
 */
const updateLectureById = async (lectureId, updateBody) => {
  const lecture = await getLectureById(lectureId);
  if (!lecture) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
  }

  Object.assign(lecture, updateBody);
  await lecture.save();
  return lecture;
};



module.exports = {
  createLecture,
  getLectureById,
  updateLectureById,
  deleteLectureById,
  getLecturesByChapterId
};
