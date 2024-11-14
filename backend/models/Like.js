const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true }
);

//  User Model

const Like = mongoose.model("Like", LikeSchema);

module.exports = {
  Like,
};
