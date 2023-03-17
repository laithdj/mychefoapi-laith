const httpStatus = require('http-status');
const { Chapter } = require('../models');
const { ObjectId } = require('mongoose').Types;
const ApiError = require('../utils/ApiError');


/**
 * Create a chapter
 * @param {Object} chapterBody
 * @returns {Promise<Chapter>}
 */
const createChapter = async (chapterBody) => {
  return Chapter.create(chapterBody);
};


/**
 * Get chapter by id
 * @param {ObjectId} id
 * @returns {Promise<Chapter>}
 */
const getChapterById = async (id) => {
  return Chapter.findById(id);
};


/**
 * Delete chapter by id
 * @param {ObjectId} id
 * @returns {Promise<Chapter>}
 */
const deleteChapterById = async (id) => {
  const chapter = await getChapterById(id);
  
  await chapter.remove();

  return chapter;
};



/**
 * Get chapter with lectures by chapterId
 * @param {ObjectId} chapterId
 * @returns {Promise<Object[]>}
 */
const getChapterAndLecturesByChapterId = async (id) => {
  return Chapter.aggregate().match({ _id: ObjectId(id) }).lookup({
    from: "lectures",
    localField: "_id",
    foreignField: "chapterId",
    as: "lectures"
  },
  );
};



/**
 * Get chapters with lectures by courseId
 * @param {ObjectId} courseId
 * @returns {Promise<Object[]>}
 */
const getChaptersAndLecturesByCourseId = async (id) => {
  return Chapter.aggregate().match({courseId: ObjectId(id)}).lookup({
        from: "lectures",
        localField: "_id",
        foreignField: "chapterId",
        as: "lectures"
      },
  );
};



/**
 * Update chapter by id
 * @param {ObjectId} chapterId
 * @param {Object} updateBody
 * @returns {Promise<Chapter>}
 */
const updateChapterById = async (chapterId, updateBody) => {
  const chapter = await getChapterById(courseId);
  if (!chapter) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chapter not found');
  }

  Object.assign(chapter, updateBody);
  await chapter.save();
  return chapter;
};



module.exports = {
  createChapter,
  getChapterById,
  updateChapterById,
  getChaptersAndLecturesByCourseId,
  getChapterAndLecturesByChapterId,
  deleteChapterById
};
