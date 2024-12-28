const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // 1. Kiểm tra người dùng có cung cấp email hoặc phone không
    if (!email && !phone) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email hoặc số điện thoại' });
    }

    // 2. Kiểm tra email hoặc phone đã tồn tại
    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email đã tồn tại' });
      }
    }

    if (phone) {
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
      }
    }

    // 3. Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Tạo người dùng mới
    const newUser = await User.create({
      email: email || null, // Nếu không có email, gán null
      phone: phone || null, // Nếu không có phone, gán null
      password: hashedPassword,
      name,
    });

    // 5. Trả phản hồi
    return res.status(201).json({
      message: 'Đăng ký thành công',
      user: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
       
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
};
