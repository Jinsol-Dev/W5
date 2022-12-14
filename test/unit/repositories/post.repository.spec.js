const { JsonWebTokenError } = require("jsonwebtoken");
const PostsRepository = require("../../../repositories/posts.repository");

const mockPostsModel = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
});
