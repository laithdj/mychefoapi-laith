const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { chapterService, lectureService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { serializeToJson, serializeCourseList } = require('../utils/json-serializer');



const addChapter = catchAsync(async (req, res) => {

    const chapter = await chapterService.createChapter(req.body);

    res.status(httpStatus.CREATED).send({chapter});
});


const updateChapter = catchAsync(async (req, res) => {

    const chapter = await chapterService.updateChapter(req.params.chapterId, req.body);

    res.send(chapter);
});


const deleteChapter = catchAsync(async (req, res) => {

    const lectures = await lectureService.getLecturesByChapterId(req.params.id);

    if(lectures && lectures.length){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Can\'t delete!. chapter contains lectures');
    }
    const chapter = await chapterService.deleteChapterById(req.params.id);

    res.status(httpStatus.NO_CONTENT).send();
});


const getChapter = catchAsync(async (req, res) => {

    const chapter = await chapterService.getChapterById(req.body);

    if(!chapter){
        throw new ApiError(httpStatus.NOT_FOUND, 'Chapter not found');
    }
    res.send(chapter);
});


const getChapters = catchAsync(async (req, res) => {

    const chapter = await chapterService.getChapterById(req.body);

    if(!chapter){
        throw new ApiError(httpStatus.NOT_FOUND, 'Chapter not found');
    }
    res.send(chapter);
});


const getChaptersAndLecture = catchAsync(async (req, res) => {

    const chapters = await chapterService.getChaptersAndLecturesByCourseId(req.params.id);



    if(!chapters){
        throw new ApiError(httpStatus.NOT_FOUND, 'Chapter not found');
    }

    res.send({ chapters: serializeCourseList(chapters)});
});




module.exports = {
    addChapter,
    updateChapter,
    deleteChapter,
    getChapter,
    getChaptersAndLecture,
    getChapters,
    deleteChapter
};
