const PostsLikeService = require("../../../services/postslike.service");
const PostsService = require("../../../services/posts.service");

let mockpostsRepository = {
    findDetailPost: jest.fn(),
}

let mockpostLikeRepository = {
  createPostLike: jest.fn(),
  findPostsLike: jest.fn(),
  deletePostLike: jest.fn(),
  findAllLikePost: jest.fn()
  }


describe('postlike Service Layer Test', () => {
    let postsLikeService = new PostsLikeService(); 
  postsLikeService.postsLikeRepository = mockpostLikeRepository; 
  
    let postsService = new PostsService();
    postsService.postsRepository = mockpostsRepository;
 
  beforeEach(() => {
    jest.resetAllMocks(); 
  });
 
  test('createPostLike Method By Success', async () => {

    // 게시글 상세조회
    postsLikeService.postsRepository.findDetailPost = jest.fn(() => {
      return {
        "post": {
          "postId": 1,
          "userId": 1,
          "nickname": "qwer",
          "title": "1번쨰 게시글",
          "content": "1번째 게시글 내용",
          "createdAt": "2022-12-13T09:55:12.000Z",
          "updatedAt": "2022-12-13T09:55:12.000Z"
        }        
      };
    });
    // 게시글에 좋아요가 표시되었는지 확인
    postsLikeService.postsLikeRepository.findPostsLike = jest.fn(() => {
      return {
        "postlikes": {
          "postlikeId": 15,
          "userId": 1,
          "postId": 1,
          "createdAt": "2022-12-13T09:55:12.000Z",
          "updatedAt": "2022-12-13T09:55:12.000Z"
      }}
    });
    // 게시글에 좋아요 생성
    postsLikeService.postsLikeRepository.createPostLike = jest.fn(() => {
     return "게시글 좋아";
    });

    // 게시글에 좋아요 취소 
    postsLikeService.postsLikeRepository.deletePostLike = jest.fn(() => {
      return "게시글 좋아요 취소";
    });

    const postLike = await postsLikeService.createPostLike({ userId: 1, postId: 1 })
    

    expect(postsLikeService.postsRepository.findDetailPost).toHaveBeenCalledTimes(1)
    expect(postsLikeService.postsLikeRepository.findPostsLike).toHaveBeenCalledTimes(1)
    expect(postsLikeService.postsLikeRepository.createPostLike).toHaveBeenCalledTimes(0)
    expect(postsLikeService.postsLikeRepository.deletePostLike).toHaveBeenCalledTimes(1)
    expect(postLike).toEqual({ message: "게시글 좋아요 취소" })
      
  });


  
  // 좋아요 표시된 게시글  조회
  test('findAllLikePost Method By Success', async () => {
    postsLikeService.findAllLikePost = jest.fn(() => {
      return "findAllLikePosts";
    });
    const isExistfindAllLikePosts = await postsLikeService.findAllLikePost({ userId:5 });
    
    expect(postsLikeService.findAllLikePost).toHaveBeenCalledTimes(1);
    expect(postsLikeService.findAllLikePost).toHaveBeenCalledWith({
      userId: 5,
    });
    expect(isExistfindAllLikePosts).toEqual("findAllLikePosts");
    
  });
});



