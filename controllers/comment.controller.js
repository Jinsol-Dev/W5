const CommentService = require("../services/comment.service");

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  //댓글 작성
  createComment = async (req, res) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const { userId, nickname } = res.locals.user;

    try {
      if (comment === "") {
        return res.status(400).json({ errorMessage: "댓글 내용을 입력해주세요." });
      }
      const commentData = await this.commentService.createComment(userId, nickname, comment, postId);

      res.status(200).json({ data: commentData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: "댓글 작성에 실패하였습니다." });
    }
  };

  //댓글 조회
  findComments = async (req, res) => {
    const { postId } = req.params;
    try {
      const comments = await this.commentService.findComments(postId);

      res.status(200).json({ data: comments });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }
  };

  //댓글 수정
  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;

    try {
      if (comment === "") {
        return res.status(404).json({ errorMessage: "댓글이 존재하지 않습니다." });
      }
      const updateComment = await this.commentService.updateComment(userId, commentId, comment);

      res.status(200).json({ data: updateComment });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: "댓글 수정에 실패하였습니다." });
    }
  };

  //댓글 삭제
  removeComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;

    try {
      const comment = await this.commentService.removeComment(userId, commentId);

      res.status(200).json({ data: comment });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: "댓글 삭제에 실패하였습니다." });
    }
  };
}

module.exports = CommentController;
