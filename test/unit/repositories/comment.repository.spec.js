const CommentRepository = require("../../../repositories/comment.repository.js");

// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockCommentsModel = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

let commentRepository = new CommentRepository();
commentRepository.commentsModel = mockCommentsModel;

describe("Layered Architecture Pattern Posts Repository Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  //댓글 작성
  test("Posts Repository createComment Method", async () => {
    mockCommentsModel.create = jest.fn(() => {
      return "create Result";
    });

    const createComment = await commentRepository.createComment({ userId: 1, nickname: "leee", comment: "qwer", postId: 1 });

    expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

    expect(mockCommentsModel.create).toHaveBeenCalledWith({ userId: 1, nickname: "leee", comment: "qwer", postId: 1 });

    expect(createComment).toEqual("create Result");
  });

  //댓글 조회
  test("Posts Repository findComments Method", async () => {
    mockCommentsModel.findAll = jest.fn(() => {
      return "findAll Resule";
    });

    const findeAllComment = await commentRepository.findComments();

    expect(mockCommentsModel.findAll).toHaveBeenCalledTimes(1);

    expect(findeAllComment).toEqual("findAll Resule");
  });

  //댓글 상세 조회
  test("Comment Repository findComment Method", async () => {
    mockCommentsModel.findOne = jest.fn(() => {
      return "findOne Result";
    });

    const findeOneComment = await commentRepository.findComment({ commentId: 1 });

    expect(mockCommentsModel.findOne).toHaveBeenCalledTimes(1);

    expect(findeOneComment).toEqual("findOne Result");
  });

  //댓글 수정
  test("Comment Repository updateComment Method", async () => {
    mockCommentsModel.update = jest.fn(() => {
      return "update Result";
    });

    const updateComment = await commentRepository.updateComment({ comment: "qwer", commentId: 1 });

    expect(mockCommentsModel.update).toHaveBeenCalledTimes(1);

    expect(mockCommentsModel.update).toHaveBeenCalledWith({ comment: "qwer" }, { where: { commentId: 1 } });

    expect(updateComment).toEqual("update Result");
  });

  //댓글 삭제
  test("Comment Repository removeComment Method", async () => {
    mockCommentsModel.destroy = jest.fn(() => {
      return "delete Result";
    });

    const removeComment = await commentRepository.removeComment({commentId : 1});

    expect(mockCommentsModel.destroy).toHaveBeenCalledTimes(1);

    expect(mockCommentsModel.destroy).toHaveBeenCalledWith( { where: { commentId: 1 } });

    expect(removeComment).toEqual("delete Result");
  });
});
