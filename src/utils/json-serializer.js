const pick = require("./pick");

const serializeToJson = (obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    return obj;
}


const serializeCourseList = (list) => {
    let newList = [];
    if (list) {
        newList = list.map(element => {
            element.lectures = element.lectures?.map(inner => {
                return pick(serializeToJson(inner), ['id', 'title', 'chapterId', 'courseId', 'description', 'order', 'filename'])
            });
            return serializeToJson(element);
        });
    }
    return newList
}



module.exports = {
    serializeToJson,
    serializeCourseList
}