const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {subscriptionService } = require('../services');
const pick = require('../utils/pick');
const { serializeToJson, serializeCourseList } = require('../utils/json-serializer');

         
const addSubscription = catchAsync(async (req, res) => {
    // channel_id: req.user._id // in req.user._id will give logged user id.
    console.log('sub controller');
    const subscription = await subscriptionService.createSubsciption({ ...req.body,
        couponId:req.body.couponId, coupen_perc:req.body.coupen_perc, studentId:req.user._id, couresId:req.body.courseId, channel_id:req.body.channel_id,  CoupenApply:req.body.CoupenApply });

    res.status(httpStatus.CREATED).send(subscription);
});
/*
    user_id, mean the student who is logged in and also he has subscribed
    this .is not sending by frontend. getting from here and passingg to service.
*/

const getSubscriptionByStudentId = catchAsync(async (req, res) => {
    
    const subscription = await subscriptionService.getSubscriptionByStudentId(req.user._id)
    if (!subscription) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Subscription not found');
    }
    res.send({ subscription });
});


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
    addSubscription,
    getSubscriptionByStudentId
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
