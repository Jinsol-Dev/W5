// const { DESCRIBE } = require("sequelize/types/query-types");
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

  test("findAllPost Method의 Success Case", async () => {
    // posts 변수를 만드는데, 그 값은 this.postsModel.findAll()을 실행했을 때 만들어짐
    // => this.postsModel.findAll이 아무런 입력값도 받지 않고 1번 실행됨
    // this.postsModel.findAll()을 실행한 결과값이 return 값으로 전달됨

    const resultFindAll = "실행 결과";
    postsRepository.postsModel.findAll = jest.fn(() => {
      return resultFindAll;
    });

    const posts = await postsRepository.findAllPost();

    expect(postsRepository.postsModel.findAll).toHaveBeenCalledWith({
      order: [["postId", "DESC"]],
      include: [{ model: this.postLikeModel, attributes: [] }],
      attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt", [sequelize.fn("COUNT", sequelize.col("Postlikes.userId")), "likes"]],
      group: "postId",
    });
    expect(postsRepository.postsModel.findAll).toHaveBeenCalledTimes(1);
    expect(posts).toBe(resultFindAll);
  });

  test("creatPost Mehod의 Success Case", async () => {
    postsRepository.postsModel.create = jest.fn(() => {
      return "실행 성공";
    });

    const createdPost = await postsRepository.createPost({ title: "타이틀", content: "콘텐트", userId: 1, nickname: "어렵어렵" });

    expect(postsRepository.postsModel.create).toHaveBeenCalledTimes(1);
    expect(createdPost).toEqual("실행 성공");
  });

  test("findDetailPost Mehod의 Success Case", async () => {
    postsRepository.postsModel.findByPk = jest.fn(() => {
      return "실행 성공";
    });
    const DetailPost = await postsRepository.findDetailPost({ postId: 1 });

    expect(postsRepository.postsModel.findByPk).toHaveBeenCalledTimes(1);
    expect(DetailPost).toBe("실행 성공");
  });

  test("updatePost Mehod의 Success Case", async () => {
    postsRepository.postsModel.update = jest.fn(() => {
      return "실행 성공";
    });
    const updatedPost = await postsRepository.updatePost({ postId: 1, title: "테스트", content: "코드" });

    expect(postsRepository.postsModel.update).toHaveBeenCalledTimes(1);
    expect(updatedPost).toEqual("실행 성공");
  });

  test("deletePost Mehod의 Success Case", async () => {
    postsRepository.postsModel.destroy = jest.fn(() => {
      return "실행 성공";
    });
    const deletedPost = await postsRepository.deletePost({ postId: 1 });

    expect(postsRepository.postsModel.destroy).toHaveBeenCalledTimes(1);
    expect(deletedPost).toEqual("실행 성공");
  });
});
