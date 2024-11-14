const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Get Routes

const userPath = require("./routes/user");
const authPath = require("./routes/auth");
const commentsPath = require("./routes/comments");
const followersPath = require("./routes/follower");
const likesPath = require("./routes/like");
const postsPath = require("./routes/post");
const savedPath = require("./routes/saved");

// PORT SERVER

const port = process.env.Port || 5000;

// Connection to Database

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`Connected to MongoDb...`))
  .catch((error) => console.log(`Connection Failed to MongoDb`, error));

// Init App
const app = express();
// Apply Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes

app.use("/api/user", userPath);
app.use("/api/auth", authPath);
app.use("/api/comments", commentsPath);
app.use("/api/followers", followersPath);
app.use("/api/likes", likesPath);
app.use("/api/poste", postsPath);
app.use("/api/saves", savedPath);
// Server Running

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
