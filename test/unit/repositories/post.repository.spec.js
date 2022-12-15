const PostsRepository = require("../../../repositories/posts.repository");
const { sequelize } = require("../../../models");

const mockPostsModel = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
});

describe("posts Repository Layer Test", () => {
  let postsRepository = new PostsRepository();
  postsRepository.postsModel = mockPostsModel();
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("repositoryFindAllPosts Method의 Success Case", async () => {
    const resultFindAll = "실행 결과";
    postsRepository.postsModel.findAll = jest.fn(() => {
      return resultFindAll;
    });

    const posts = await postsRepository.findAllPosts();

    expect(postsRepository.postsModel.findAll).toHaveBeenCalledWith({
      order: [["postId", "DESC"]],
      include: [{ model: this.postLikeModel, attributes: [] }],
      attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt", [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"]],
      group: "postId",
    });
    expect(postsRepository.postsModel.findAll).toHaveBeenCalledTimes(1);
    expect(posts).toEqual(resultFindAll);
  });

  test("repositoryCreatePost Mehod의 Success Case", async () => {
    postsRepository.postsModel.create = jest.fn(() => {
      return "실행 성공";
    });

    const createdPost = await postsRepository.createPost({ title: "타이틀", content: "콘텐트", userId: 1, nickname: "어렵어렵" });

    expect(postsRepository.postsModel.create).toHaveBeenCalledWith({ title: "타이틀", content: "콘텐트", userId: 1, nickname: "어렵어렵" });
    expect(postsRepository.postsModel.create).toHaveBeenCalledTimes(1);
    expect(createdPost).toEqual("실행 성공");
  });

  test("repositoryFindDetailPost Mehod의 Success Case", async () => {
    postsRepository.postsModel.findByPk = jest.fn(() => {
      return "실행 성공";
    });
    const DetailPost = await postsRepository.findDetailPost({ postId: 1 });

    expect(postsRepository.postsModel.findByPk).toHaveBeenCalledTimes(1);
    expect(DetailPost).toBe("실행 성공");
  });

  test("repositoryUpdatePost Mehod의 Success Case", async () => {
    postsRepository.postsModel.update = jest.fn(() => {
      return "수정 성공";
    });
    const updatedPost = await postsRepository.updatePost({ postId: 1, title: "테스트", content: "코드" });

    expect(postsRepository.postsModel.update).toHaveBeenCalledTimes(1);
    expect(updatedPost).toEqual("수정 성공");
  });

  test("repositoryDeletePost Mehod의 Success Case", async () => {
    postsRepository.postsModel.destroy = jest.fn(() => {
      return "삭제 성공";
    });
    const deletedPost = await postsRepository.deletePost({ postId: 1 });

    expect(postsRepository.postsModel.destroy).toHaveBeenCalledTimes(1);
    expect(deletedPost).toBe("삭제 성공");
  });
});
