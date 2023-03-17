const { number, boolean, string } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const channelSchema = mongoose.Schema(
  {
    channelId: {
      type: Number,
      required: true
    },
    status: {   //it can be remove lator don't know why adding.
      type: Boolean,
      default: false
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    subscriberDetail: {
        username:String,
        email:String,
        sub_date:Date,
        end_date:Date
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
channelSchema.plugin(toJSON);
channelSchema.plugin(paginate);

/**
 * @typedef Channel
 */
const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;