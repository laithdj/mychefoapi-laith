const { number, boolean } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const couponSchema = mongoose.Schema(
  {
    // coupenId: {
    //   type: Number,
    //   required: true
    // },
    promo_code: {
      type: String,
      default:0
    },
    discount: {
      type: String,
      default: 0
    },
    blacklisted: {
      type: Boolean,
      default: false
    },
    channel_id:{
      // type: mongoose.Schema.Types.ObjectId,
      type:String,
      required: true,
    },
    Coupen_name:{
      // type: mongoose.Schema.Types.ObjectId,
      type:String,
      default:"New coupen"
    },
    Expiry_date:{
      type: Date,
     default:Date.now
    }
  },

  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

/**
 * @typedef Coupon
 */
const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;