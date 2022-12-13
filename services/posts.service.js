const PostsRepository = require("../repositories/posts.repository");
const { Posts, Postlikes } = require("../models");

class PostsService {
  postsRepository = new PostsRepository(Posts, Postlikes);

  //게시글 생성
  createPost = async ({ title, content, userId, nickname }) => {
    const post = await this.postsRepository.creatPost({ title, content, userId, nickname });
    return post;
  };

  //게시글 조회
  findAllPost = async () => {
    const posts = await this.postsRepository.findAllPost();
    return posts;
  };

  //좋아요 게시글 조회
  findAllLikePost = async ({ userId }) => {
    const likePosts = await this.postsRepository.findAllLikePost({ userId });
    return likePosts;
  };
  //게시글 상세 조회
  findDetailPost = async ({ postId }) => {
    const post = await this.postsRepository.findDetailPost({ postId });
    return post;
  };
  //게시글 수정
  updatePost = async ({ userId, postId, title, content }) => {
    const isExisPost = await this.postsRepository.findDetailPost({ postId });
    if (userId === isExisPost.userId) {
      const post = await this.postsRepository.updatePost({ postId, title, content });
      return post;
    } else {
      throw new Error("내가 작성한 게시글이 아니면 수정할 수 없습니다.");
    }
  };
  //게시글 삭제
  deletePost = async ({ userId, postId }) => {
    const isExisPost = await this.postsRepository.findDetailPost({ postId });
    if (!isExisPost) {
      throw new Error("게시글 존재하지 않습니다.", 404);
    } else {
      if (userId === isExisPost.userId) {
        const post = await this.postsRepository.deletePost({ postId });
        return post;
      } else {
        throw new Error("내가 작성한 게시글이 아니면 삭제할 수 없습니다.");
      }
    }
  };
}

module.exports = PostsService;