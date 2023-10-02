const express = require('express');

const factoryController = require('../controllers/factoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/').post(factoryController.getFactoryItems);
router.route('/add').post(factoryController.addFactoryItem);
router.route('/:id').delete(factoryController.deleteFactoryItem);

module.exports = router;
