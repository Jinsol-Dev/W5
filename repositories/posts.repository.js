const { sequelize } = require("../models");

class PostsRepository {
  constructor(postModel, postLikeModel) {
    this.postModel = postModel;
    this.postLikeModel = postLikeModel;
  }

  //게시글 생성
  creatPost = async ({ title, content, userId, nickname }) => {
    this.postModel.create({ title, content, userId, nickname });
  };

  //게시글 목록 조회
  findAllPost = async () => {
    const posts = await this.postModel.findAll({
      order: [["postId", "DESC"]],
      include: [{ model: this.postLikeModel, attributes: [] }],
      attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt", [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"]],
      group: "postId",
    });
    return posts;
  };

  //좋아요 게시글 조회
  findAllLikePost = async ({ userId }) => {
    const likePosts = await this.postLikeModel.findAll({
      where: { userId },
      include: [{ model: this.postModel, attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt"] }],
      attributes: [],
    });
    return likePosts;
  };

  //게시글 상세 조회
  findDetailPost = async ({ postId }) => {
    const post = await this.postModel.findByPk(postId);
    return post;
  };

  //게시글 수정
  updatePost = async ({ postId, title, content }) => {
    await this.postModel.update({ title: title, content: content }, { where: { postId } });
  };

  //게시글 삭제
  deletePost = async ({ postId }) => {
    await this.postModel.destroy({ where: { postId } });
  };
}

module.exports = PostsRepository;
