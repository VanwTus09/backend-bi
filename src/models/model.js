const { DataTypes } = require('sequelize');
const sequelize = require('../models/model');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: true, // Email có thể null
    unique: true,
    validate: {
      isEmail: true, // Kiểm tra định dạng email
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Số điện thoại có thể null
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Mật khẩu bắt buộc
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = User;
