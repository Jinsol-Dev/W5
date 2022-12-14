const PostsLikeRepository = require("../repositories/postslike.repository");
const PostsRepository = require("../repositories/posts.repository");

class PostsLikeService {
  constructor () {
    this.postsLikeRepository = new PostsLikeRepository();
    this.postsRepository = new PostsRepository();
  }
  
  //게시글 좋아요 등록
  createPostLike = async ({ userId, postId }) => {
    const isExistPost = await this.postsRepository.findDetailPost({ postId });
    if (!isExistPost) {
      throw new Error("게시글이 존재하지 않습니다.", 404);
    }

    const postsLike = await this.postsLikeRepository.postsLike({ userId, postId });
    if (!postsLike) {
      await this.postsLikeRepository.createPostLike({ userId, postId });
      return { message: "게시글 좋아" };
    } else {
      await this.postsLikeRepository.deletePostLike({ userId, postId });
      return { message: "게시글 좋아요 취소" };
    }
  };

  //좋아요 게시글 조회
  findAllLikePost = async ({ userId }) => {
    const likePosts = await this.postsLikeRepository.findAllLikePost({ userId });
    if (likePosts.length === 0) {
      throw { message: "내가 좋아요 한 게시글이 없습니다.", code: 404 };
    } else {
      return likePosts;
    }
  };
}

module.exports = PostsLikeService;
