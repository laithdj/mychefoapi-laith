const express = require('express');
const validate = require('../../middlewares/validate');
const courseValidation = require('../../validations/course.validation');
const courseController = require('../../controllers/course.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();



router
    .route('/gcourse/:id')
    .get( courseController.Course )

router
    .route('/')
    .get(auth(), courseController.getCourses)
    .post(auth(), validate(courseValidation.addCourse), courseController.addCourse)

router
    .route('/:id')
    .get( courseController.getCourse )
    .patch(auth(), validate(courseValidation.updateCourse), courseController.updateCourse )
    .delete(auth(), courseController.deleteCourse);

router
    .route('/basicinfo/:courseId')
    .get(auth(), courseController.getBasicinfo)
    .patch(auth(), validate(courseValidation.updateCourseBasicInfo), courseController.updateBasicinfo)

router
    .route('/goals/:courseId')
    .get(auth(), courseController.getCourseGoals)
    .patch(auth(), validate(courseValidation.updateCourseGoals), courseController.updateCourseGoals) //

router
    .route('/messages/:courseId')
    .get(auth(), courseController.getCourseMessages)
    .patch(auth(), validate(courseValidation.updateCourseMessages), courseController.updateCourseMessages)

router
    .route('/:id/curriculam')
    .get(auth(), courseController.getCurruculam)
    .patch(auth(), validate(courseValidation.updateCourseCurriculam), courseController.updateCurriculam)

router
    .route('/search/:query')
    .get(validate(courseValidation.searchCourse) , courseController.searchCourses)
// now updatation is not calling because now price is channel wise.
router
.route('/price/:courseId')
.get(auth(), courseController.getCoursePrice)
.patch(auth(), courseController.updateCoursePrice)



module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course Management and retreival
 */

/**
 * @swagger
 * /course/:
 *   post:
 *     summary: Create new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - catagory
 *               - type
 *               - time
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 8
 *               catagory:
 *                 type: string
 *               type:
 *                 type: string
 *               time:
 *                 type: string
 *             example:
 *               title: demo title
 *               time: 0-2
 *               type: course
 *               catagory: development
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */