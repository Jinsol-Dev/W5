const { Users } = require("../models");

class SignRepository {
  constructor() {
    this.usersModel = Users;
  }
  createUser = async (nickname, password) => {
    const createUserData = await this.usersModel.create({ nickname, password });

    return createUserData;
  };

  findUser = async (nickname) => {
    const user = await this.usersModel.findOne({ where: { nickname } });

    return user;
  };
}

module.exports = SignRepository;
