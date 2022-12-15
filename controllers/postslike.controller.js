const PostsLikeService = require("../services/postslike.service");

class PostsLikeController {
  constructor() {
    this.postsLikeService = new PostsLikeService();
  }

  //게시글 좋아요 등록
  createPostLike = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const test = await this.postsLikeService.createPostLike({ userId, postId }); //service와의 연결점
      res.status(200).json({ result: test });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "게시글 좋아요에 실패하였습니다." });
    }
  };

  //좋아요 게시글 조회
  getLikePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const likePosts = await this.postsLikeService.findAllLikePost({ userId });
      res.json({ likePosts });
    } catch (err) {
      console.log(err);
      if (err.code) {
        return res.status(err.code).json({ message: err.message });
      } else {
        return res.status(400).json({ errorMessage: "좋아요 게시글 조회에 실패하였습니다." });
      }
    }
  };
}

module.exports = PostsLikeController;
