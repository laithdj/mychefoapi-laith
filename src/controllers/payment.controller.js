const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
/*
    here will apply secret key, in front/client will use public key.
*/
// process.env.SECRET_KEY
// sk_test_51LVGnHHwjO4eQge8yd9xWLQ1Yh7ufclUrS7IVD2n3BZ6Kz2nED9nyb1HHHOHalA0xaOquAX9SEEFCX2ihVk53Koh00qAhkU1m1
const stripe = require("stripe")("sk_test_51LVGnHHwjO4eQge8yd9xWLQ1Yh7ufclUrS7IVD2n3BZ6Kz2nED9nyb1HHHOHalA0xaOquAX9SEEFCX2ihVk53Koh00qAhkU1m1");

// const { subscriptionService } = require('../services');
// const pick = require('../utils/pick');
// const { serializeToJson, serializeCourseList } = require('../utils/json-serializer');



const makePayment = catchAsync(async (req, res) => {
    console.log('make payment controller.');
    try {
        const token = req.body.token;
        let paymentAmount = req.body.amount;
        paymentAmount = paymentAmount*100;
        const customer = stripe.customers
            .create({
                email: token.email,
                source: token.id
            })
            .then((customer) => {
                return stripe.charges.create({
                    amount: paymentAmount,
                    description: "Payment with Stripe",
                    currency: "USD",
                    customer: customer.id
                });
            })
            .then((charge) => {
                res.json({
                    data: "success"
                })
            })
            .catch((err) => {
                console.log('err : ', err);
                res.json({
                    data: "failure",
                });
            });
        return true;
    } catch (error) {
        return false;
    }
});




module.exports = {
    makePayment
};
