const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const router = express.Router();

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 */

router.post("/register", async (req, res) => {
  try {
    let userName = await User.findOne({ userName: req.body.userName });
    if (userName) {
      return res
        .status(400)
        .json({ message: "User with given userName already exists!" });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with given email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      avatar: req.body.avatar,
      banner: req.body.banner,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

/**
 * @desc Login
 * @route /api/auth/login
 * @method POST
 */

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
