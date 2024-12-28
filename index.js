const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Đảm bảo rằng bạn đã cài đặt cors
const app = express();
const port = 3000;
require('dotenv').config()
// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:5174', // Chỉ cho phép yêu cầu từ localhost:5174
  methods: ['GET', 'POST'], // Cho phép các phương thức GET và POST
  allowedHeaders: ['Content-Type'], // Cho phép headers này
}));

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/binguyen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully!');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Tạo một schema và model cho User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Định nghĩa route cho API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route để tạo tài khoản người dùng
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password, // Lưu mật khẩu đã mã hóa (khuyến khích dùng bcrypt)
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Lắng nghe ứng dụng trên cổng 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});