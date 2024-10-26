import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
  },

  isVerified: {
    // Corrected the spelling
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  VerifyToken: String,
  VerifyTokenExpiry: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema); // Corrected model name check

export default User;
