const express = require("express");
const { Comment } = require("../models/Comment");
const userArr = require("../helper/userArr");
const postArr = require("../helper/postArr");
const router = express.Router();

/**
 * @desc     Get All Comments of the Post
 * @route    /api/comments
 * @method   GET
 * @access   public
 */

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate([
      { path: "user", select: userArr },
      { path: "post", select: postArr },
    ]);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
});

/**
 * @desc     Add a comment to the Post
 * @route    /api/comments
 * @method   POST
 * @access   public
 */

router.post("/", async (req, res) => {
  try {
    const comment = new Comment({
      user: req.body.user,
      post: req.body.post,
      description: req.body.description,
    });
    const result = await comment.save();
    if (result) {
      res.status(201).json(comment);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
});

/**
 * @desc     Delete a comment from His Id
 * @route    /api/comments/:id
 * @method   DELETE
 * @access   public
 */

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
module.exports = router;
