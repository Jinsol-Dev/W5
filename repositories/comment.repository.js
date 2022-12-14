const { Comments } = require("../models");

class CommentRepository {
  constructor() {
    this.commentsModel = Comments;
  }
  //댓글 작성
  createComment = async (userId, nickname, comment, postId) => {
    const createCommentData = await this.commentsModel.create({ userId, nickname, comment, postId });

    return createCommentData;
  };

  //댓글 조회
  findComments = async (postId) => {
    const commentsData = await this.commentsModel.findAll({ where: { postId } });

    return commentsData;
  };
  //댓글 상세 조회
  findComment = async (commentId) => {
    const comment = await this.commentsModel.findOne({ where: { commentId } });

    return comment;
  };
  //댓글 수정
  updateComment = async (userId, commentId, comment) => {
    await this.commentsModel.update({ comment: comment }, { where: { commentId } });
  };

  //댓글 삭제
  removeComment = async (userId, commentId) => {
    await this.commentsModel.destroy({ where: { commentId } });
  };
}

module.exports = CommentRepository;
