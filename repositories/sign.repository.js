const { Users } = require("../models");

class SignRepository {
  createUser = async (nickname, password) => {
    const createUserData = await Users.create({ nickname, password });

    return createUserData;
  };

  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });

    return user;
  };
}

module.exports = SignRepository;
