const express = require('express');
const subscriptionController = require('../../controllers/subscription.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();


router
    .route('/')
    .post(auth(), subscriptionController.addSubscription)

router
    .route('/getSubscriptionByStudentId')
    .get(auth(),subscriptionController.getSubscriptionByStudentId);
    // .patch(auth(), validate(courseValidation.updateCourse), courseController.updateCourse )
    // .delete(auth(), courseController.deleteCourse);

// router
//     .route('/basicinfo/:courseId')
//     .get(auth(), courseController.getBasicinfo)
//     .patch(auth(), validate(courseValidation.updateCourseBasicInfo), courseController.updateBasicinfo)

// router
//     .route('/goals/:courseId')
//     .get(auth(), courseController.getCourseGoals)
//     .patch(auth(), validate(courseValidation.updateCourseGoals), courseController.updateCourseGoals) //

// router
//     .route('/messages/:courseId')
//     .get(auth(), courseController.getCourseMessages)
//     .patch(auth(), validate(courseValidation.updateCourseMessages), courseController.updateCourseMessages)

// router
//     .route('/:id/curriculam')
//     .get(auth(), courseController.getCurruculam)
//     .patch(auth(), validate(courseValidation.updateCourseCurriculam), courseController.updateCurriculam)

// router
//     .route('/search/:query')
//     .get(validate(courseValidation.searchCourse) , courseController.searchCourses)



module.exports = router;