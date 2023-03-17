const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { courseService, lectureService, chapterService } = require('../services');
const pick = require('../utils/pick');
const { serializeToJson, serializeCourseList } = require('../utils/json-serializer');


const addCourse = catchAsync(async (req, res) => {
    console.log('course Body : ', req.body, " user : ", req.user._id);
    const course = await courseService.createCourse({ ...req.body, userId: req.user._id,author: req.user.name });

    res.status(httpStatus.CREATED).send(course);
});


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


const searchCourses = catchAsync(async (req, res) => {

    const courses = await courseService.searchCourse(req.params.query);

    // if (!courses) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    // }

    let serializedCourse = courses.map(course => {
        return pick(serializeToJson(course.toObject()), ['id', 'title', 'author', 'subtitle', 'type']);
    })

    res.send({ courses: serializedCourse || [], query: req.params.query });
});


const getCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log("idddddddd",id);
    const course = await courseService.getCourseById(id);
    const chapters = await chapterService.getChaptersAndLecturesByCourseId(id);

    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    res.send({ course: {...course.toObject(), curriculam: serializeCourseList(chapters) }});
});

// ________________________________________________________________________________________________________________
const Course = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log("idddddddd",id);
    const course = await courseService.getCourseByUserId(id);
    // const chapters = await chapterService.getChaptersAndLecturesByCourseId(id);
    console.log(course,"sdfjsklfk")
    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    let serializedCourse = course.map(course => {
        return pick(serializeToJson(course.toObject()), ['title', 'id', 'category', 'userId', 'author']);
    })

    // console.log(basicInfo);
    res.send({ courses: serializedCourse });
    // res.send({course});
    // res.send({ course: {...course.toObject(), curriculam: serializeCourseList(chapters) }});
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

    const basicInfo = pick(course.toObject(), ['title', 'subtitle', 'description', 'language', 'level', 'catagory', 'subcatagory', 'primaryInfo', 'image', 'promoVideo','price'])

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

// update course wise price
const updateCoursePrice = catchAsync(async (req, res) => {
    console.log('updateCoursePrice');

    const course = await courseService.updateCourseById(req.params.courseId, req.body)

    res.send({ price: course.price });
});
// course wise course Price..,
const getCoursePrice = catchAsync(async (req, res) => {
    console.log('getCoursePrice');
    const course = await courseService.getCourseById(req.params.courseId);

    if (!course) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }

    res.send({ price: course.price });
});



module.exports = {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    getCourseMessages,
    updateCourseMessages,
    updateCourseGoals,
    getCourseGoals,
    updateBasicinfo,
    getBasicinfo,
    getCurruculam,
    updateCurriculam,
    searchCourses,
    getCoursePrice,
    updateCoursePrice,
    Course
};
