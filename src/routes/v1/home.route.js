const express = require('express');
const validate = require('../../middlewares/validate');
const homeValidation = require('../../validations/home.validation');
const homeController = require('../../controllers/home.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();


router
    .route('/')
    .get( homeController.getHomepageCourses)


module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Homepage course management and retreival
 */

/**
 * @swagger
 * /home/:
 *   get:
 *     summary: Return catagory list
 *     tags: [Home]
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catagories:
 */