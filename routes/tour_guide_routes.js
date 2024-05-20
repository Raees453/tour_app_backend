const router = require('express').Router();

const tourGuidesController = require('../controllers/tour_guides_controller');

router.route('/').get(tourGuidesController.getTourGuides);

module.exports = router();
