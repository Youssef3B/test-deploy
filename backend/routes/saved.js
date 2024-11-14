const express = require("express");
const { Saved } = require("../models/Saved");
const userArr = require("../helper/userArr");
const postArr = require("../helper/postArr");
const router = express.Router();

/**
 * @desc     Get All saves
 * @route    /api/saves
 * @method   GET
 * @access   public
 */
router.get("/", async (req, res) => {
  try {
    const saves = await Saved.find().populate([
      {
        path: "user",
        select: userArr,
      },
      {
        path: "post",
        select: postArr,
        populate: {
          path: "user",
          select: userArr,
        },
      },
    ]);

    res.status(200).json(saves);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @desc     Add A new save
 * @route    /api/saves
 * @method   POST
 * @access   public
 */

router.post("/", async (req, res) => {
  try {
    const save = new Saved({
      user: req.body.user,
      post: req.body.post,
    });
    const result = await save.save();
    if (result) {
      res.status(201).json(save);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

/**
 * @desc     Delete a save
 * @route    /api/saved/id
 * @method   DELETE
 * @access   public
 */

router.delete("/", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const save = await Saved.findOneAndDelete({ user: userId, post: postId });
    if (save) {
      res.status(200).json({ message: "Save successfully removed" });
    } else {
      res.status(404).json({ message: "Save not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

module.exports = router;
