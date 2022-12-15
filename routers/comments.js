const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

router.post("/:postId", auth, commentController.createComment);
router.get("/:postId", commentController.findComments);
router.put("/:commentId", auth, commentController.updateComment);
router.delete("/:commentId", auth, commentController.removeComment);

module.exports = router;
