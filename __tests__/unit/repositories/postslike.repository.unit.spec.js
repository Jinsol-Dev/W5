const PostsLikeRepository = require("../../../repositories/postslike.repository");


let mockpostLikeModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
}

let postsLikeRepository = new PostsLikeRepository(mockpostLikeModel);

describe('Layered Architecture Pattern Posts Repository Unit Test', () => {

 
  beforeEach(() => {
    jest.resetAllMocks(); 
  })

  //좋아요 게시글 조회
  test('PostsLikeRepository findAllLikePost Method', async () => {   
    mockpostLikeModel.findAll = jest.fn(() => {
      return "findAll Result"
    });
    const likedPostReturn = [
        {
          "Post": {
            "postId": 9,
            "userId": 5,
            "nickname": "berry",
            "title": "berry",
            "createdAt": "2022-12-14T02:29:01.000Z",
            "updatedAt": "2022-12-14T02:29:01.000Z"
          }
        }
      ]
    const postsLike = await postsLikeRepository.findAllLikePost({userId:5});
    
    expect(mockpostLikeModel.findAll).toHaveBeenCalledTimes(1);
    expect(postsLike).toEqual(likedPostReturn);
  });
  
});