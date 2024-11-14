const express = require("express");
const { Like } = require("../models/Like");
const userArr = require("../helper/userArr");
const postArr = require("../helper/postArr");
const router = express.Router();

/**
 * @desc     Get All Likes
 * @route    /api/like
 * @method   POST
 * @access   public
 */

router.get("/", async (req, res) => {
  try {
    const likes = await Like.find().populate([
      { path: "user", select: userArr },
      { path: "post", select: postArr },
    ]);
    if (likes) {
      res.status(200).json(likes);
    }
  } catch (error) {
    console.error("Error in GET /api/post:", error);
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

router.post("/", async (req, res) => {
  try {
    const like = new Like({
      user: req.body.user,
      post: req.body.post,
    });

    const result = await like.save();
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
/**
 * @desc     Delete a like from His Id
 * @route    /api/like/:id
 * @method   DELETE
 * @access   public
 */

router.delete("/", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    // Find and delete the save by userId and postId
    await Like.findOneAndDelete({ user: userId, post: postId });
    res.status(200).send("Save deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting save");
  }
});
module.exports = router;
