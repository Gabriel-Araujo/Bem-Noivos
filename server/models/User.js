const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  role: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['REGULAR', 'SUPPLIER', 'ADMIN'],
  },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
