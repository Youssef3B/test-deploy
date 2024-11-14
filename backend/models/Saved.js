const mongoose = require("mongoose");

const SavedSchema = new mongoose.Schema(
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

const Saved = mongoose.model("Saved", SavedSchema);

module.exports = {
  Saved,
};
