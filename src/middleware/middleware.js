const { body, validationResult } = require('express-validator');

const validateRegister = [
  body('email').optional().isEmail().withMessage('Email không hợp lệ'),
  body('phone').optional().isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  body('password').isLength({ min:4  }).withMessage('Mật khẩu phải có ít nhất 4 ký tự'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Thêm middleware vào route
router.post('/register', validateRegister, handleValidationErrors, auth.register);
