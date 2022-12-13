const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

//게시글 생성
router.post("/", auth, postsController.createPost);

//게시글 목록 조회
router.get("/", postsController.findAllPosts);

//좋아요 게시글 조회
router.get("/like", auth, postsController.getLikePost);

//게시글 조회
router.get("/:postId", postsController.getDetailPost);

//게시글 수정
router.put("/:postId", auth, postsController.updatePost);

//게시글 삭제
router.delete("/:postId", auth, postsController.deletePost);


module.exports = router;
