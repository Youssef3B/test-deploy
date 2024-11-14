const express = require("express");
const { Post } = require("../models/Post");
const userArr = require("../helper/userArr");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../frontend/public/uploads"); // Replace with your desired upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generate unique filename
  },
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

/**
 * @path /api/posts/:id
 * @method PUT
 * @description Update a post with an image
 */

/**
 * @desc Get All Posts
 * @route /api/post
 * @method GET
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", userArr);
    res.status(200).json(posts);
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

/**
 * @desc Get Post By His Id
 * @route /api/post/:id
 * @method GET
 * @access public
 */

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", userArr);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
/**
 * @desc Create a new post
 * @route /api/post
 * @method POST
 * @access public
 */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      user: req.body.user,
      title: req.body.title,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    const result = await post.save();
    if (result) {
      res.status(201).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

/**
 * @desc Add a like
 * @route /api/post/like
 * @method POST
 * @access public
 */

router.post("/like", async (req, res) => {
  try {
    const post = new Post({
      likes: req.body.likes,
    });
    const result = await post.save();
    if (result) {
      res.status(201).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

/**
 * @desc Edit Post From His Id
 * @route /api/Post/:id
 * @method PUT
 * @access public
 */

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
        },
      },
      { new: true }
    );

    if (post) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong", error });
  }
});

/**
 * @desc Delete Post From His Id
 * @route /api/post/:id
 * @method DELETE
 * @access public
 */

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Post went wrong", error });
  }
});

module.exports = router;
