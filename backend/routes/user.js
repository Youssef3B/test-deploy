const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/**
 * @path /api/user/allusers
 * @method GET
 * @description Get All Users
 */

router.get("/allusers", async (req, res) => {
  try {
    const usersList = await User.find();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ message: "Something wen Wrong", error });
  }
});

/**
 * @path /api/user/getUserById
 * @method GET
 * @description Get User From His Id
 */

router.get("/getUserById/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something wen wrong", error });
  }
});

/**
 * @path /api/user/UpdateUserById
 * @method PUT
 * @description Edit User From His Id
 */

router.put(
  "/editUserById/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let avatarFilename, bannerFilename;
      if (req.files) {
        if (req.files.avatar) {
          avatarFilename = req.files.avatar[0].filename;
        }
        if (req.files.banner) {
          bannerFilename = req.files.banner[0].filename;
        }
      }

      const updatedUser = {
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        bio: req.body.bio,
        avatar: avatarFilename || req.body.avatar, // Use uploaded file or keep existing
        banner: bannerFilename || req.body.banner,
      };

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updatedUser },
        { new: true }
      );

      if (user) {
        res.status(200).json({ message: "User updated successfully", user });
      } else {
        res.status(404).json({ error: "User Not Found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
