const router=require('express').Router();

const authRoutes = require('./auth_routes');
const tourGuides = require('./tour_guide_routes');
const filesRoutes = require('./files_routes');

router.use('/auth', authRoutes);

router.use('/tour-guides', tourGuides);

router.use('/upload', filesRoutes);

module.exports = router;
