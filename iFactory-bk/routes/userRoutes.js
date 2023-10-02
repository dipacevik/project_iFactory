const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// PROTECTED METHODS
// router.use(authController.protect);

router.route('/login').post(authController.login);
router.route('/sign-up').post(authController.signup);
router.route('/is-logged').post(authController.protect, authController.isLoggedIn);

router.route('/logout').post(authController.logout);

router
	.route('/')
	.post(authController.protect, authController.restrictTo('admin'), userController.getAllUsers);
router
	.route('/create/')
	.post(authController.protect, authController.restrictTo('admin'), userController.addUser);

router
	.route('/time/')
	.get(authController.protect, userController.getTimeLogs)
	.post(authController.protect, userController.addTimeLogs)
	.patch(authController.protect, userController.closeTimeLogs);

router
	.route('/task/')
	.get(authController.protect, userController.getUserTask)
	.post(authController.protect, userController.getTaskByUser);
router
	.route('/task/:id')
	.patch(authController.protect, userController.updateUserTask)
	.delete(authController.protect, authController.restrictTo('admin'), userController.deleteTask);
router.route('/task/add/').post(authController.protect, userController.addUserTask);

module.exports = router;
