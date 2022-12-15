const PostsLikeController = require('../../../controllers/postslike.controller');

const mockpostsLikeService = {
    createPostLike: jest.fn(),
    findAllLikePost: jest.fn(),
}

let mockRequest = {
    body: jest.fn(),
    params: jest.fn(),
};

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    locals: {
        user:jest.fn()
    }
};


describe('postsLike Controller Layer Test', () => {
    let postsLikeController = new PostsLikeController();
    postsLikeController.postsLikeService = mockpostsLikeService;

    
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status = jest.fn(() => {
            return mockResponse
        });
    });

    

    //게시글 좋아요 등록
    test('createPostLike Method Success Case', async () => {
        const createPostLikeParams = {
            postId: 1,
        };
        mockRequest.params = createPostLikeParams;
        mockResponse.locals = {user:{userId:1}}  //userId를 넣어주니 돌아감

        // const createPostLike = {
        //     postId: 1,
        // };

        await postsLikeController.createPostLike(mockRequest, mockResponse)

        expect(mockpostsLikeService.createPostLike).toHaveBeenCalledTimes(1);
        expect(mockpostsLikeService.createPostLike).toHaveBeenCalledWith({userId:1, postId:1});
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({message: "게시글 좋아요에 성공했습니다."}); //test, result내의 값
    

        expect(mockResponse.status).toHaveBeenCalledWith(200);
    
    });



    //좋아요 게시글 조회
    test('getLikePost Method Success Case', async () => {
        const findAllLikePostValue = { message:"게시글 좋아" };
        const mockuserId = {userId:1}
        mockResponse.locals.user = mockuserId;

        mockpostsLikeService.findAllLikePost = jest.fn(() => {
            return findAllLikePostValue;
        });

        await postsLikeController.getLikePost(mockRequest, mockResponse)

        expect(mockpostsLikeService.findAllLikePost).toHaveBeenCalledTimes(1);
        expect(mockpostsLikeService.findAllLikePost).toHaveBeenCalledWith(
            mockuserId.userId
        );
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({likePosts: findAllLikePostValue});
    });
});