const CommentService = require("../../../services/comment.service.js");

let mockCommentsRepository = {
  createComment: jest.fn(),
  findComments: jest.fn(),
  findComment: jest.fn(),
  updateComment: jest.fn(),
  removeComment: jest.fn(),
};

let commentService = new CommentService();
// postService의 Repository를 Mock Repository로 변경합니다.
commentService.commentRepository = mockCommentsRepository;

describe("Layered Architecture Pattern Comments Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  //댓글 작성
  test("Comments Service createComment Method", async () => {
    createCommentReturnData = "";
    mockCommentsRepository.createComment = jest.fn(() => {
      return createCommentReturnData;
    });
    const createComment = await commentService.createComment({ userId: 1, nickname: "asd", comment: "qwe", postId: 1 });

    expect(mockCommentsRepository.createComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsRepository.createComment).toHaveBeenCalledWith({ userId: 1, nickname: "asd", comment: "qwe", postId: 1 });

    expect(createComment).toEqual(createCommentReturnData);
  });

  //댓글 조회
  test("Comments Service findComment Method", async () => {
    const findCommentReturnValue = {
      commentId: 5,
      postId: 2,
      userId: 1,
      nickname: "Leee",
      comment: "바껴라",
      createdAt: "2022-12-13T12:11:27.000Z",
      updatedAt: "2022-12-13T16:23:01.000Z",
    };

    mockCommentsRepository.findComments = jest.fn(() => {
      return findCommentReturnValue;
    });

    const comments = await commentService.findComments({ postId: 1 });

    expect(comments).toEqual(findCommentReturnValue);
    expect(mockCommentsRepository.findComments).toHaveBeenCalledTimes(1);
    expect(mockCommentsRepository.findComments).toHaveBeenCalledWith({ postId: 1 });
  });

  //댓글 수정
  test("Comments Service updateComment Method By Success", async () => {
    const findCommentReturnValue = {
      commentId: 1,
      postId: 2,
      userId: 1,
      nickname: "Leee",
      comment: "바껴라",
      createdAt: "2022-12-13T12:11:27.000Z",
      updatedAt: "2022-12-13T16:23:01.000Z",
    };
    mockCommentsRepository.findComment = jest.fn(() => {
      return findCommentReturnValue;
    });
    mockCommentsRepository.updateComment = jest.fn(() => {
      return "수정완료";
    });

    const updateComment = await commentService.updateComment({ userId: 1, commentId: 1, comment: "바껴라" });

    expect(mockCommentsRepository.findComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsRepository.findComment).toHaveBeenCalledWith(1);

    expect(mockCommentsRepository.updateComment).toHaveBeenCalledTimes(1);
    expect(updateComment).toEqual("수정완료");
  });

  //댓글 삭제
  test("Comments Service deleteComment Method By Success", async () => {
    const findCommentReturnValue = {
      commentId: 1,
      postId: 2,
      userId: 1,
      nickname: "Leee",
      comment: "바껴라",
      createdAt: "2022-12-13T12:11:27.000Z",
      updatedAt: "2022-12-13T16:23:01.000Z",
    };
    mockCommentsRepository.findComment = jest.fn(() => {
      return findCommentReturnValue;
    });
    mockCommentsRepository.removeComment = jest.fn(() => {
      return "삭제완료";
    });

    const deleteComment = await commentService.removeComment({ userId: 1, commentId: 1 });

    expect(mockCommentsRepository.findComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsRepository.findComment).toHaveBeenCalledWith({ commentId: 1 });

    expect(mockCommentsRepository.removeComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsRepository.removeComment).toHaveBeenCalledWith({ commentId: 1 });

    expect(deleteComment).toEqual("삭제완료");
  });
});
