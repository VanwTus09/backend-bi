const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Route xử lý đăng ký
router.post('/register', authController.register);

module.exports = router;
