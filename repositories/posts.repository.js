const { sequelize } = require("../models");

class PostsRepository {
  constructor(postsModel, postLikeModel) {
    this.postsModel = postsModel;
    this.postLikeModel = postLikeModel;
  }

  //게시글 생성
  createPost = async ({ title, content, userId, nickname }) => {
    return await this.postsModel.create({ title, content, userId, nickname });
  };

  //게시글 목록 조회
  findAllPosts = async () => {
    const posts = await this.postsModel.findAll({
      order: [["postId", "DESC"]],
      include: [{ model: this.postLikeModel, attributes: [] }],
      attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt", [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"]],
      group: "postId",
    });
    return posts;
  };

  //게시글 상세 조회
  findDetailPost = async ({ postId }) => {
    const post = await this.postsModel.findByPk(postId);
    return post;
  };

  //게시글 수정
  updatePost = async ({ postId, title, content }) => {
    return await this.postsModel.update({ title: title, content: content }, { where: { postId } });
  };

  //게시글 삭제
  deletePost = async ({ postId }) => {
    return await this.postsModel.destroy({ where: { postId } });
  };
}

module.exports = PostsRepository;
