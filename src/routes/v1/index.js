const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const courseRoute = require('./course.route');
const mediaRoute = require('./media.route');
const lectureRoute = require('./lecture.route');
const chapterRoute = require('./chapter.route');
const catagoryRoute = require('./catagory.route');
const homeRoute = require('./home.route');
const config = require('../../config/config');

// later changes
const couponRoute = require('./coupon.route');
const subscriptionRoute = require('./subscription.route');
const channelRoute = require('./channel.route');
const paymentRoute = require('./payment.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/media',
    route: mediaRoute,
  },
  {
    path: '/chapter',
    route: chapterRoute,
  },
  {
    path: '/lecture',
    route: lectureRoute,
  },
  {
    path: '/catagory',
    route: catagoryRoute,
  },
  {
    path: '/home',
    route: homeRoute,
  },
  {
    path: '/coupon',
    route: couponRoute,
  },
  {
    path: '/channel',
    route: channelRoute,
  },
  {
    path: '/subscription',
    route: subscriptionRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
