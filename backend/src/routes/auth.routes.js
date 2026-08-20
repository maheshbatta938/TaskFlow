const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { signupValidator, loginValidator } = require('../validators/auth.validator');

const router = express.Router();

router.post('/signup', signupValidator, validate, authController.signup);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
