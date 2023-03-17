const express = require('express');
const validate = require('../../middlewares/validate');
const catagoryValidation = require('../../validations/catagory.validation');
const catagoryController = require('../../controllers/catagory.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();


router
    .route('/')
    .get( catagoryController.getCatagories)


module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Catagory
 *   description: Course Management and retreival
 */

/**
 * @swagger
 * /catagory/:
 *   get:
 *     summary: Return catagory list
 *     tags: [Catagory]
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catagories:
 *                   $ref: '#/components/schemas/Catagory'
 */