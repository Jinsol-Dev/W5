const PostsLikeRepository = require("../../../repositories/postslike.repository");


const mockpostLikeModel = () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
})


describe('Layered Architecture Pattern Posts Repository Unit Test', () => {
  let postsLikeRepository = new PostsLikeRepository();
  postsLikeRepository.postLikeModel = mockpostLikeModel(); // mock설정 완료
 
  beforeEach(() => {
    jest.resetAllMocks(); 
  })
  
  //게시글 좋아요가 있는지 없는지
  test('postsLike Method Success Code', async () => {   
    postsLikeRepository.postLikeModel.findOne = jest.fn(() => {
      return "findOne Result"
    });
    const result = await postsLikeRepository.postsLike({userId:5});
    
    
    expect(postsLikeRepository.postLikeModel.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual("findOne Result");
  });

  //좋아요 생성
  test('createPostLike Method Success Code', async () => {   
    postsLikeRepository.postLikeModel.create = jest.fn(() => {
      return "create Result"
    });
    
    const result = await postsLikeRepository.createPostLike({userId:1, postId:1});
      
    expect(postsLikeRepository.postLikeModel.create).toHaveBeenCalledTimes(1);        
    expect(postsLikeRepository.postLikeModel.create).toHaveBeenCalledWith({
      postId:1,
      userId:1,        
    })
    expect(result).toEqual("create Result");
    
  });

  //좋아요 삭제
  test('deletePostLike Method Success Code', async () => {   
  postsLikeRepository.postLikeModel.destroy = jest.fn(() => {
    return "destroy Result"
  });
  
  const result = await postsLikeRepository.deletePostLike({userId:1, postId:1});
    
  expect(postsLikeRepository.postLikeModel.destroy).toHaveBeenCalledTimes(1);        
  expect(postsLikeRepository.postLikeModel.destroy).toHaveBeenCalledWith({ where: { userId:1, postId:1 } });
  expect(result).toEqual("destroy Result");
  
  });

//좋아요 게시글 조회
test('findAllLikePost Method SuccessCode', async () => {   
  postsLikeRepository.postLikeModel.findAll = jest.fn(() => {
    return "findAll Result"
  });
  const result = await postsLikeRepository.findAllLikePost({userId:5});  
  
  expect(postsLikeRepository.postLikeModel.findAll).toHaveBeenCalledTimes(1);
  expect(postsLikeRepository.postLikeModel.findAll).toHaveBeenCalledWith({
    where: { userId:5 },
    include: [{ model: this.postModel, attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt"] }],
    attributes: [],
  })
  expect(result).toEqual("findAll Result");
});
  
});