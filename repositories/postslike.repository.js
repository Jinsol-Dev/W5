class PostsLikeRepository {
    constructor (postLikeModel){
        this.postLikeModel = postLikeModel;
    }
    // postsLikeService = new PostsLikeService();
     
    // 게시글 좋아요가 있는지 없는지 확인
    postsLike = async ({userId, postId}) => {
        const isExistLike = await this.postLikeModel.findOne({ where: {userId, postId} });
        return isExistLike;
    };
    // 좋아요 생성
    createPostLike = async ({ userId, postId}) => {
        await this.postLikeModel.create({ userId, postId })
    };
    // 좋아요 삭제
    deletePostLike = async ({ userId, postId}) => {
        await this.postLikeModel.destroy({ where: {userId, postId} })
    }
};

module.exports = PostsLikeRepository;