const PostsService = require("../services/Posts.Service");

class PostsController {
  postsService = new PostsService();

  //게시글 생성
  createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { userId, nickname } = res.locals.user;

      if (!title || !content) {
        throw new Error("데이터 형식이 올바르지 않습니다.", 412);
      }
      await this.postsService.createPost({
        title,
        content,
        userId,
        nickname,
      });
      res.json({ message: "게시글 작성에 성공하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." });
    }
  };

  //게시글 목록 조회
  findAllPosts = async (req, res) => {
    try {
      const posts = await this.postsService.findAllPost();
      res.json({ posts });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다.1" });
    }
  };

  //좋아요 게시글 조회
  getLikePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const likePosts = await this.postsService.findAllLikePost({ userId });
      res.json({ likePosts });
    } catch {
      console.log(error);
      res.status(400).json({ errorMessage: "좋아요 게시글 조회에 실패하였습니다." });
    }
  };

  //게시글 상세 조회
  getDetailPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.findDetailPost({ postId });
      res.json({ post });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다.2" });
    }
  };

  //게시글 수정
  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;
      if (!title || !content) return res.status(412).json({ message: "데이터 형식이 올바르지 않습니다.3" });
      await this.postsService.updatePost({ userId, postId, title, content });
      return res.json({ message: "게시글을 수정하였습니다." });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  };

  //게시글 삭제
  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await this.postsService.deletePost({ userId, postId });
      return res.json({ message: "게시글을 삭제하였습니다." });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  };
}

module.exports = PostsController;
