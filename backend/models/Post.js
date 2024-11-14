const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

//  User Model

const Post = mongoose.model("Post", PostSchema);

module.exports = {
  Post,
};
