const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.js");
const commentsRouter = require("./comments.js");
const signRouter = require("./sign.js");
const likeRouter = require("./likes.js");

router.use("/", signRouter);
router.use("/posts", [likeRouter, postsRouter]);
router.use("/comments", commentsRouter);

module.exports = router;
