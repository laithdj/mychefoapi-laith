const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chapterSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        order:{
            type: Number,
            default: 0,
        },
        description:{
            type: String,
            trim: true,
            default: ''
        },
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
chapterSchema.plugin(toJSON);
chapterSchema.plugin(paginate);

/**
 * @typedef Chapter
 */
const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
