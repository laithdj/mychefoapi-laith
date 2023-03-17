const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const catagorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    shortNm: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    subcatagories:[
      {
        title:{
          type: String,
          trim: true,
        },
        description:{
          type: String,
          trim: true,
        },
        shortNm:{
          type: String,
          trim: true,
        }
      }
    ]

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
catagorySchema.plugin(toJSON);
catagorySchema.plugin(paginate);

/**
 * @typedef Catagory
 */
const Catagory = mongoose.model('Catagory', catagorySchema);

module.exports = Catagory;
