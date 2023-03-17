const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    subtitle: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    language:{
      type: String,
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['course', 'practice'],
    },
    catagory: {
      type: String,
      required: true,
      trim: true,
    },
    subcatagory: {
      type: String,
      trim: true
    },
    time: {
      type: String,
      default: 'not_set',
    },
    primaryInfo: {
      type: String,
      trim: true,
    },
    goals: {
      what_you_will_learn: {
        type: [String],
        default: [null, null, null, null]
      },
      requirements: {
        type: [String],
        default: [null]
      },
      who_should_attend: {
        type: [String],
        default: [null]
      }
    },
    messages: {
      welcome: {
        type: String,
        trim: true
      },
      congrats: {
        type: String,
        trim: true
      }
    },
    price:{
      type:Number,
      trim:true,
      default:0
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    promoVideo: {
      type: String,
      trim: true,
      default: ''
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    published:{
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

/**
 * @typedef Course
 */
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
