const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lectureSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        order:{
            type: Number,
        },
        description:{
            type: String,
            trim: true,
            default: ''
        },
        media:{
            type: String,
            trim: true,
            default: '',
        },
        filename:{
            type: String,
            trim: true,
        },
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        chapterId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
lectureSchema.plugin(toJSON);
lectureSchema.plugin(paginate);

/**
 * @typedef Lecture
 */
const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
