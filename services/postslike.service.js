const PostsLikeRepository = require("../repositories/postslike.repository");
const PostsRepository = require("../repositories/posts.repository");
const { Posts, Postlikes } = require("../models");

class PostsLikeService {
<<<<<<< HEAD
    postsLikeRepository = new PostsLikeRepository(Postlikes);
    postsRepository = new PostsRepository(Posts);
   
    
    //게시글 좋아요 등록
    createPostLike = async ({ userId, postId }) => {
        const isExistPost = await this.postsRepository.findDetailPost({postId})
        if (!isExistPost) {
            throw new Error ("게시글이 존재하지 않습니다.", 404)
        }
       
        const postsLike = await this.postsLikeRepository.postsLike({ userId, postId })        
        if (!postsLike) {
          await this.postsLikeRepository.createPostLike({ userId, postId })
          return { message: "게시글 좋아"};
        } else {
          await this.postsLikeRepository.deletePostLike({ userId, postId })
          return { message: "게시글 좋아요 취소"};
        }
    };
};
=======
  postsLikeRepository = new PostsLikeRepository(Postlikes);
  postsRepository = new PostsRepository(Posts);
>>>>>>> 2728c591a4c3cb239677401922ff8e9169c4ade3

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
}

module.exports = PostsLikeService;
