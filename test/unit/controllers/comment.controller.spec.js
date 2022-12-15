const CommentsController = require("../../../controllers/comment.controller.js");

// posts.service.js 에서는 아래 5개의 Method만을 사용합니다.
let mockCommentService = {
  createComment: jest.fn(),
  findComments: jest.fn(),
  updateComment: jest.fn(),
  removeComment: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};

data = { user: { userId: 1, nickname: "좀되라" } };

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: data,
};

let commentsController = new CommentsController();
// postsController의 Service를 Mock Service로 변경합니다.
commentsController.commentService = mockCommentService;

describe("Layered Architecture Pattern Comments Controller Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  // 댓글 작성
  test("Comments Controller createComment Method by Success", async () => {
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    await commentsController.createComment(mockRequest, mockResponse);

    expect(mockCommentService.createComment).toHaveBeenCalledTimes(1);

  });

  //댓글 조회
  test("Comments Controller getComments Method by Success", async () => {
    mockRequest.params = { postId: 1 };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    const findCommentsReturnValue = {
      commentId: 5,
      postId: 1,
      userId: 1,
      nickname: "Leee",
      comment: "바껴라",
      createdAt: "2022-12-13T12:11:27.000Z",
      updatedAt: "2022-12-13T16:23:01.000Z",
    };

    mockCommentService.findComments = jest.fn(() => {
      return findCommentsReturnValue;
    });

    await commentsController.findComments(mockRequest, mockResponse);

    expect(mockCommentService.findComments).toHaveBeenCalledTimes(1);
    expect(mockCommentService.findComments).toHaveBeenCalledWith(1);
  });

  //댓글 수정
  test("Comments Controller updateComment Method by Invalid Params Error", async () => {
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    await commentsController.updateComment(mockRequest, mockResponse);

    expect(mockCommentService.updateComment).toHaveBeenCalledTimes(1);
  });

  //댓글 삭제
  test("Comments Controller deleteComment Method by Invalid Params Error", async () => {
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    const comments = "";
    mockCommentService.deleteComment = jest.fn(() => {
      return comments;
    });

    await commentsController.removeComment(mockRequest, mockResponse);

    expect(mockCommentService.removeComment).toHaveBeenCalledTimes(1);
  });
});
