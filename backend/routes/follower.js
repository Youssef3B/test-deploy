const express = require("express");
const { Follower } = require("../models/Follower");
const userArr = require("../helper/userArr");
const router = express.Router();

/**
 * @desc     Get All Followers
 * @route    /api/followers
 * @method   GET
 * @access   public
 */

router.get("/", async (req, res) => {
  try {
    const followers = await Follower.find().populate([
      { path: "userWhoFollow", select: userArr },
      { path: "userWhoFollowed", select: userArr },
    ]);

    res.status(200).json(followers);
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
 * @desc     Add a Follower
 * @route    /api/followers
 * @method   POST
 * @access   public
 */

router.post("/", async (req, res) => {
  try {
    const follower = new Follower({
      userWhoFollow: req.body.userWhoFollow,
      userWhoFollowed: req.body.userWhoFollowed,
    });

    const result = await follower.save();
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

router.delete("/", async (req, res) => {
  const { userWhoFollow, userWhoFollowed } = req.body;

  try {
    const result = await Follower.findOneAndDelete({
      userWhoFollow,
      userWhoFollowed,
    });
    if (result) {
      res.status(200).json({ message: "Follow deleted successfully" });
    } else {
      res.status(404).json({ message: "Follow relationship not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting follow", error });
  }
});

module.exports = router;
