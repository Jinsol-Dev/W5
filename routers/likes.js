const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const PostsLikeController = require("../controllers/postslike.controller");
const postsLikeController = new PostsLikeController();

//게시글 좋아요
router.put("/:postId/like", auth, postsLikeController.createPostLike);

//좋아요 게시글 조회
router.get("/like", auth, postsLikeController.getLikePost);

module.exports = router;
