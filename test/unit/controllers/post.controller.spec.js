const PostsController = require("../../../controllers/posts.controller");

const mockPostsService = () => ({
  createPost: jest.fn(),
  findAllPosts: jest.fn(),
  findDetailPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
});

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};
let data = { user: { userId: 1, nickname: "좀 되라" } };

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: data,
};

describe("posts Controller Layer Test", () => {
  let postsController = new PostsController();
  postsController.postsService = mockPostsService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  //게시글 생성
  test("controllerCreatePost Method의 Success Case", async () => {
    mockRequest.body = { title: "새벽5시", content: "힘들다" };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });

    postsController.postsService.createPost = jest.fn(() => {
      return "생성완료";
    });

    await postsController.createPost(mockRequest, mockResponse);

    expect(postsController.postsService.createPost).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "게시글을 생성하였습니다" });
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });
  //게시글 목록 조회
  test("controllerfindAllPosts Method의 Success Case", async () => {
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    const posts = [
      {
        postId: 1,
        userId: 1,
        nickname: "qwer1",
        title: "7번쨰 게시글",
        createdAt: "2022-12-14T10:37:00.000Z",
        updatedAt: "2022-12-14T10:37:00.000Z",
        likes: 0,
      },
    ];
    postsController.postsService.findAllPosts = jest.fn(() => {
      return posts;
    });

    await postsController.findAllPosts(mockRequest, mockResponse);

    expect(postsController.postsService.findAllPosts).toHaveBeenCalledTimes(1);
    expect(postsController.postsService.findAllPosts).toHaveBeenCalledWith();
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      posts: [
        {
          postId: 1,
          userId: 1,
          nickname: "qwer1",
          title: "7번쨰 게시글",
          createdAt: "2022-12-14T10:37:00.000Z",
          updatedAt: "2022-12-14T10:37:00.000Z",
          likes: 0,
        },
      ],
    });
  });
  //게시글 상세 조회
  test("controllerGetDetailPost Method의 Success Case", async () => {
    mockRequest.params = { postId: 1 };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    const post = {
      postId: 1,
      userId: 1,
      nickname: "qwer1",
      title: "7번쨰 게시글",
      content: "7번째 게시글 내용",
      createdAt: "2022-12-14T10:37:00.000Z",
      updatedAt: "2022-12-14T10:37:00.000Z",
      likes: 0,
    };
    postsController.postsService.findDetailPost = jest.fn(() => {
      return post;
    });

    await postsController.getDetailPost(mockRequest, mockResponse);

    expect(postsController.postsService.findDetailPost).toHaveBeenCalledTimes(1);
    expect(postsController.postsService.findDetailPost).toHaveBeenCalledWith({ postId: 1 });
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({
      post: {
        postId: 1,
        userId: 1,
        nickname: "qwer1",
        title: "7번쨰 게시글",
        content: "7번째 게시글 내용",
        createdAt: "2022-12-14T10:37:00.000Z",
        updatedAt: "2022-12-14T10:37:00.000Z",
        likes: 0,
      },
    });
  });
  //게시글 수정
  test("controllerUpdatePost Method의 Success Case", async () => {
    mockRequest.params = { postId: 1 };
    mockRequest.body = { title: "거의다왔다", content: "화이팅" };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    const post = {
      postId: 1,
      userId: 1,
      nickname: "qwer1",
      title: "7번쨰 게시글",
      content: "7번째 게시글 내용",
      createdAt: "2022-12-14T10:37:00.000Z",
      updatedAt: "2022-12-14T10:37:00.000Z",
      likes: 0,
    };
    postsController.postsService.findDetailPost = jest.fn(() => {
      return post;
    });
    postsController.postsService.updatePost = jest.fn(() => {
      return "수정 완료";
    });
    await postsController.updatePost(mockRequest, mockResponse);

    expect(postsController.postsService.updatePost).toHaveBeenCalledTimes(1);
    expect(postsController.postsService.updatePost).toHaveBeenCalledWith({ userId: 1, postId: 1, title: "거의다왔다", content: "화이팅" });
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });
  //게시글 삭제
  test("controllerDeletePost Method의 Success Case", async () => {
    mockRequest.params = { postId: 1 };
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    const post = {
      postId: 1,
      userId: 1,
      nickname: "qwer1",
      title: "7번쨰 게시글",
      content: "7번째 게시글 내용",
      createdAt: "2022-12-14T10:37:00.000Z",
      updatedAt: "2022-12-14T10:37:00.000Z",
      likes: 0,
    };
    postsController.postsService.findDetailPost = jest.fn(() => {
      return post;
    });

    postsController.postsService.deletePost = jest.fn(() => {
      return "삭제 완료";
    });
    await postsController.deletePost(mockRequest, mockResponse);

    expect(postsController.postsService.deletePost).toHaveBeenCalledTimes(1);
    expect(postsController.postsService.deletePost).toHaveBeenCalledWith({ userId: 1, postId: 1 });
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });
});
