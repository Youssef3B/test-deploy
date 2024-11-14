const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

//  User Model

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment,
};
