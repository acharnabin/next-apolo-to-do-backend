const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profile_image: {
    type: String,
    default: null,
  },
  otp: {
    type: Number,
    default: null,
  },
  otp_generate_time: {
    type: Date,
    default: Date.now,
  },
  isRegistrationComplete: {
    type: Boolean,
    default: false,
  },
});

const UserModel = model("users", userSchema);

module.exports = UserModel;
