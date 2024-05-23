const router = require('express').Router();

const authController = require('../controllers/auth_controller');

router.post('/login', authController.login);

router.post('/signup', authController.signUp);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);

router.post('/change-password', authController.authorise,  authController.changePassword);

module.exports = router;
