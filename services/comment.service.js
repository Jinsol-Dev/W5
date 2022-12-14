const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();

  //댓글 작성
  createComment = async (userId, nickname, comment, postId) => {
    const createCommentData = await this.commentRepository.createComment(userId, nickname, comment, postId);

    return createCommentData;
  };

  //댓글 조회
  findComments = async (postId) => {
    const findComments = await this.commentRepository.findComments(postId);

    return findComments;
  };

  //댓글 수정
  updateComment = async (userId, commentId, comment) => {
    const commentData = await this.commentRepository.findComment(commentId);

    if (userId !== commentData.userId) {
      return "내가 작성한 댓글이 아닙니다.";
    }
    const updateComment = await this.commentRepository.updateComment(userId, commentId, comment);

    return updateComment;
  };

  //댓글 삭제
  removeComment = async (userId, commentId) => {
    const commentData = await this.commentRepository.findComment(commentId);

    if (!commentData) {
      return "댓글이 존재하지 않습니다.";
    }
    if (userId !== commentData.userId) {
      return "내가 작성한 댓글이 아닙니다.";
    }
    const comment = await this.commentRepository.removeComment(userId, commentId);

    return comment;
  };
}

module.exports = CommentService;
