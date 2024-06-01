const router = require('express').Router();
const multer = require('multer');

const authController = require('../controllers/auth_controller');
const tourGuidesController = require('../controllers/tour_guides_controller');

const storage = require('../utils/storage');

const upload = multer({ storage: storage });

router.route('/').get(tourGuidesController.getTourGuides);

router.route('/profile')
  .patch(authController.authorise, upload.array('images', 5), tourGuidesController.updateTourGuide)
  .post(tourGuidesController.getTourGuideById);

module.exports = router;
