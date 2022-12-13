const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const PostsLikeController = require("../controllers/postslike.controller");
const postsLikeController = new PostsLikeController();

//게시글 좋아요 
router.put("/:postId/like", auth, postsLikeController.createPostLike);


module.exports = router;
