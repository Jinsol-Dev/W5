const PostsService = require("../../../services/posts.service");

const mockPostsRepository = {
  createPost: jest.fn(),
  findAllPost: jest.fn(),
  findDetailPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
};

describe("posts Service Layer Test", () => {
  let postsService = new PostsService();
  postsService.postsRepository = mockPostsRepository;

  beforeEach(() => {
    jest.resetAllMocks();
  });
  //게시글 생성
  test("serviceCreatePost Method의 Success Case", async () => {
    postsService.postsRepository.createPost = jest.fn(() => {
      return "생성 완료";
    });

    const createdPost = await postsService.createPost({ userId: 1, nickname: "나는누구", title: "어려워요", content: "이게뭐죠" });

    expect(postsService.postsRepository.createPost).toHaveBeenCalledTimes(1);
    expect(createdPost).toEqual("생성 완료");
  });
  //게시글 목록 조회
  test("serviceFindAllPosts Method의 Success Case", async () => {
    postsService.postsRepository.findAllPosts = jest.fn(() => {
      return { postId: 1, userId: 1, nickname: "나는누구", title: "어려워요", createAt: "2022-12-15T09:35:00.3333", updateAt: "2022-12-15T09", like: 0 };
    });
    const AllPosts = await postsService.findAllPosts();

    expect(postsService.postsRepository.findAllPosts).toHaveBeenCalledTimes(1);
    expect(AllPosts).toEqual({ postId: 1, userId: 1, nickname: "나는누구", title: "어려워요", createAt: "2022-12-15T09:35:00.3333", updateAt: "2022-12-15T09", like: 0 });
  });
  //게시글 상세조회
  test("serviceFindDetailPost Method의 Seccess Case", async () => {
    postsService.postsRepository.findDetailPost = jest.fn(() => {
      return { postId: 1, userId: 1, nickname: "나는누구", title: "어려워요", content: "이게뭐죠", createAt: "2022-12-15T09:35:00.3333", updateAt: "2022-12-15T09" };
    });

    const detailPost = await postsService.findDetailPost({ postId: 1 });

    expect(postsService.postsRepository.findDetailPost).toHaveBeenCalledWith({ postId: 1 });
    expect(postsService.postsRepository.findDetailPost).toHaveBeenCalledTimes(1);
    expect(detailPost).toEqual({ postId: 1, userId: 1, nickname: "나는누구", title: "어려워요", content: "이게뭐죠", createAt: "2022-12-15T09:35:00.3333", updateAt: "2022-12-15T09" });
  });
  //게시글 수정
  test("serviceUpdatePost Method의 Seccess Case", async () => {
    postsService.postsRepository.updatePost = jest.fn(() => {
      return "수정 완료";
    });
    postsService.postsRepository.findDetailPost = jest.fn(() => {
      return { postId: 1, userId: 1, nickname: "나는누구", title: "어려워요", content: "이게뭐죠", createAt: "2022-12-15T09:35:00.3333", updateAt: "2022-12-15T09" };
    });

    const updatedPost = await postsService.updatePost({ userId: 1, postId: 1, title: "타이틀", content: "콘텐트" });

    expect(postsService.postsRepository.updatePost).toHaveBeenCalledTimes(1);
    expect(updatedPost).toEqual("수정 완료");
  });
  //게시글 삭제
  test("serviceDeletePost Method의 Seccess Case", async () => {
    postsService.postsRepository.findDetailPost = jest.fn(() => {
      return { postId: 1, userId: 1, nickname: "나는누구", title: "어려워요", content: "이게뭐죠", createAt: "2022-12-15T09:35:00.3333", updateAt: "2022-12-15T09" };
    });
    postsService.postsRepository.deletePost = jest.fn(() => {
      return "삭제완료";
    });

    const deletedPost = await postsService.deletePost({ userId: 1, postId: 1 });
    expect(postsService.postsRepository.findDetailPost).toHaveBeenCalledTimes(1);
    expect(postsService.postsRepository.deletePost).toHaveBeenCalledTimes(1);
    expect(deletedPost).toEqual("삭제완료");
  });
});
