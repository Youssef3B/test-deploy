const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 40,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 60,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "/defaultAvatar.webp",
    },
    banner: {
      type: String,
      default: null,
      default: "/defaultBanner.png",
    },
    bio: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, avatar: this.avatar },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
