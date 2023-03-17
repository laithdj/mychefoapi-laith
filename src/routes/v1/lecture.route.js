const express = require('express');
const validate = require('../../middlewares/validate');
const lectureValidation = require('../../validations/lecture.validation');
const lectureController = require('../../controllers/lecture.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();


router
    .route('/')
    .get(auth(), lectureController.getLecture)
    .post(auth(), validate(lectureValidation.addLecture), lectureController.addLecture)

router
    .route('/:id')
    .delete(auth(), validate(lectureValidation.deleteLecture), lectureController.deleteLecture)


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