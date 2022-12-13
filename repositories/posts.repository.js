const { sequelize } = require("../models");

class PostsRepository {
  constructor(postModel, postLikeModel) {
    this.postModel = postModel;
    this.postLikeModel = postLikeModel;
    console.log(postModel)
  }

  //게시글 생성
  creatPost = async ({ title, content, userId, nickname }) => {
    const post = this.postModel.create({ title, content, userId, nickname });
    return post;
  };

  //게시글 조회
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
  //내가 원하는 목록의 표현이 아님 , 게시글이 없더라도 null값으로 표현됨
  findAllLikePost = async ({ userId }) => {
    const likePosts = await this.postLikeModel.findAll({
      where: { userId },
      include: [
        {
          model: this.postModel,
          attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt", [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"]],
          group: "postId",
        },
      ],
      attributes: [],
    });
    return likePosts;
  };

  //게시글 상세 조회
  findDetailPost = async ({ postId }) => {
    const post = await this.postModel.findByPk(postId);
    console.log(post)
    return post;
    
  };

  //게시글 수정
  updatePost = async ({ postId, title, content }) => {
    await this.postModel.update({ title: title, content: content }, { where: { postId } });
    return;
  };

  //게시글 삭제
  deletePost = async ({ postId }) => {
    await this.postModel.destroy({ where: { postId } });
  };
}

module.exports = PostsRepository;
