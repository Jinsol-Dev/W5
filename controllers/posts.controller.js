const PostsService = require("../services/Posts.Service");

class PostsController {
  postsService = new PostsService();

  //게시글 생성
  createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { userId, nickname } = res.locals.user;

      if (!title || !content) {
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
      }
      await this.postsService.createPost({ title, content, userId, nickname });
      return res.status(200).json({ message: "게시글을 생성하였습니다" });
    } catch (err) {
      console.error(err);
      if (err.code) {
        return res.status(err.code).json({ message: err.message });
      } else {
        return res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." });
      }
    }
  };

  //게시글 목록 조회
  findAllPosts = async (req, res) => {
    try {
      const posts = await this.postsService.findAllPost();
      return res.json({ posts });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다.1" });
    }
  };

  //좋아요 게시글 조회
  getLikePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const likePosts = await this.postsService.findAllLikePost({ userId });
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

  //게시글 상세 조회
  getDetailPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.findDetailPost({ postId });
      res.json({ post });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." });
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
      return res.status(200).json({ message: "게시글이 수정되었습니다." });
    } catch (err) {
      console.error(err);
      if (err.code) {
        return res.status(err.code).json({ message: err.message });
      } else {
        return res.status(400).json({ errorMessage: "게시글 수정에 실패하였습니다." });
      }
    }
  };

  //게시글 삭제
  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await this.postsService.deletePost({ userId, postId });
      return res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      return res.status(400).json({ message: err.message });
    }
  };

  
=======
      if (err.code) {
        return res.status(err.code).json({ message: err.message });
      } else {
        return res.status(400).json({ errorMessage: "게시글 삭제에 실패하였습니다." });
      }
    }
  };
>>>>>>> 2728c591a4c3cb239677401922ff8e9169c4ade3
}

module.exports = PostsController;
