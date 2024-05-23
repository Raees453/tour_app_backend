const router=require('express').Router();

const authRoutes = require('./auth_routes');
const tourGuides = require('./tour_guide_routes');

router.use('/auth', authRoutes);

router.use('/tour-guides', tourGuides);

module.exports = router;
