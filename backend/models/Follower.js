const mongoose = require("mongoose");

const FollowerSchema = new mongoose.Schema(
  {
    userWhoFollow: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userWhoFollowed: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

//  User Model

const Follower = mongoose.model("Follower", FollowerSchema);

module.exports = {
  Follower,
};
