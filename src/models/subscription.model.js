const { number } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subscriptionSchema = mongoose.Schema(
    {
        start_date: {
            type: Date,
            // required: true,
            default:Date.now
        },
        end_date: {
            type: Date,
            required: true,
            default:Date.now
        },
        publish_date: {
            type: Date,
            required: true,
            default:Date.now
        },
        discountPrice:{
            type:Number,
            // require:true,
            default:0
        },
        actualPayablePrice:{
            type:Number,
            require:true,
            default:0
        },
        paidPrice:{
            type:Number,
            require:true,
            default:0
        },

        //check Coupen is already applied or not
        CoupenApply:{
            type:Boolean,
            require:true,
            default:false
        },

        // coupon id can be send or not, can be given discount of not.
        couponId:{
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            default:null
        },  
        
        // userId or can say Channel_id
        channel_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        studentId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        coupen_perc:{
            type: Number,
            // required:true,
           
        }

    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
subscriptionSchema.plugin(toJSON);
subscriptionSchema.plugin(paginate);

/**
 * @typedef Subscription
 */
const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;