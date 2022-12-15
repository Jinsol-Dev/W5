class PostsLikeRepository {
  constructor(postModel, postLikeModel) {
    //인자 입력 순서
    this.postLikeModel = postLikeModel;
    this.postModel = postModel;
  }

  // 게시글 좋아요가 있는지 없는지 확인
  postsLike = async ({ userId, postId }) => {
    const isExistLike = await this.postLikeModel.findOne({ where: { userId, postId } });
    return isExistLike;
  };

  // 좋아요 생성
  createPostLike = async ({ userId, postId }) => {
    return await this.postLikeModel.create({ userId, postId });
  };

  // 좋아요 삭제
  deletePostLike = async ({ userId, postId }) => {
    return await this.postLikeModel.destroy({ where: { userId, postId } });
  };

  //좋아요 게시글 조회
  findAllLikePost = async ({ userId }) => {
    console.log(userId);
    const likePosts = await this.postLikeModel.findAll({
      where: { userId },
      include: [{ model: this.postModel, attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt"] }],
      attributes: [],
    });
    return likePosts;
  };
}

module.exports = PostsLikeRepository;
