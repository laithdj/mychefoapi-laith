const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { catagoryService, courseService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { serializeToJson } = require('../utils/json-serializer');



const getHomepageCourses = catchAsync(async (req, res) => {

    const catagories = await catagoryService.getCatagories();

    const courses =await courseService.getCourses();

    let catgoryWiseCourses = new Map();

    catagories.forEach(cat=>{
        let catObj = serializeToJson(cat.toObject());
        catgoryWiseCourses.set(cat.shortNm, {...pick(catObj, ['id', 'title', 'shortNm', 'description']), courses:[]});
    });

    courses.forEach(course=>{
        let courseObj = serializeToJson(course.toObject());
        catgoryWiseCourses.get(course.catagory).courses.push(pick(courseObj, ['id', 'title','author','description',  'subtitle', 'type']));
    });

    let popularCourses = [];

    let homeCourses = Array.from(catgoryWiseCourses.values())


    res.send({ homeCourses, popularCourses });
});





module.exports = {
    getHomepageCourses,
};
