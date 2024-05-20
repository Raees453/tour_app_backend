const router=require('express').Router();

const authRoutes = require('./auth_routes');
const tourGuides = require('./auth_routes');

router.use('/auth', authRoutes);

router.use('/tour-guides', tourGuides);

module.exports = router;
