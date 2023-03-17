const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {channelService } = require('../services');
const pick = require('../utils/pick');
const { serializeToJson, serializeCourseList } = require('../utils/json-serializer');



const addChannel = catchAsync(async (req, res) => {

    const coupon = await channelService.createChannel({ ...req.body, channel_id: req.user._id });

    res.status(httpStatus.CREATED).send(coupon);
});

/*
const getCourses = catchAsync(async (req, res) => {

    const courses = await courseService.getCourseByUserId(req.user._id);

    if (!courses) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    let serializedCourse = courses.map(course => {
        return pick(serializeToJson(course.toObject()), ['title', 'id', 'published']);
    })

    res.send({ courses: serializedCourse });
});
*/

// const searchCourses = catchAsync(async (req, res) => {

//     const courses = await courseService.searchCourse(req.params.query);

//     // if (!courses) {
//     //     throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
//     // }

//     let serializedCourse = courses.map(course => {
//         return pick(serializeToJson(course.toObject()), ['id', 'title', 'author', 'subtitle', 'type']);
//     })

//     res.send({ courses: serializedCourse || [], query: req.params.query });
// });


/*
const getCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const course = await courseService.getCourseById(id);
    const chapters = await chapterService.getChaptersAndLecturesByCourseId(id);

    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    res.send({ course: {...course.toObject(), curriculam: serializeCourseList(chapters) }});
});


const updateCourse = catchAsync(async (req, res) => {

    res.send(req.body);
});


const deleteCourse = catchAsync(async (req, res) => {

    res.send(req.body);
});


const getBasicinfo = catchAsync(async (req, res) => {
    const { courseId } = req.params;

    const course = await courseService.getCourseById(courseId);

    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    const basicInfo = pick(course.toObject(), ['title', 'subtitle', 'description', 'language', 'level', 'catagory', 'subcatagory', 'primaryInfo', 'image', 'promoVideo'])

    res.send({ basicInfo });
});


const updateBasicinfo = catchAsync(async (req, res) => {
    const { courseId } = req.params;


    const course = await courseService.updateCourseById(courseId, req.body.basicInfo);

    const basicInfo = pick(course.toObject(), ['title', 'subtitle', 'description', 'language', 'level', 'catagory', 'subcatagory', 'primaryInfo', 'image', 'promoVideo'])

    res.send({ basicInfo });
});


const getCourseGoals = catchAsync(async (req, res) => {
    const { courseId } = req.params;

    const course = await courseService.getCourseById(courseId);

    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    res.send({ goals: course.goals });
});


const updateCourseGoals = catchAsync(async (req, res) => {

    const course = await courseService.updateCourseById(req.params.courseId, req.body);

    res.send({ goals: course.goals });
});


const updateCourseMessages = catchAsync(async (req, res) => {

    const course = await courseService.updateCourseById(req.params.courseId, req.body)

    res.send({ messages: course.messages });
});


const getCourseMessages = catchAsync(async (req, res) => {

    const course = await courseService.getCourseById(req.params.courseId);

    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    res.send({ messages: course.messages });
});

const getCurruculam = catchAsync(async (req, res) => {

    res.send(req.body);
});


const updateCurriculam = catchAsync(async (req, res) => {

    res.send(req.body);
});
*/


module.exports = {
    addChannel,
    // getCourses,
    // getCourse,
    // updateCourse,
    // deleteCourse,
    // getCourseMessages,
    // updateCourseMessages,
    // updateCourseGoals,
    // getCourseGoals,
    // updateBasicinfo,
    // getBasicinfo,
    // getCurruculam,
    // updateCurriculam,
    // searchCourses
};
