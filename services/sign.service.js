const SignRepository = require("../repositories/sign.repository");
const jwt = require("jsonwebtoken");

class SignService {
  signRepository = new SignRepository();

  createUser = async (nickname, password) => {
    const createUserData = await this.signRepository.createUser(nickname, password);

    return createUserData;
  };

  login = async (nickname, password) => {
    const user = await this.signRepository.findUser(nickname);
    const token = await jwt.sign({ userId: user.userId, nickname: user.nickname }, "secret-key");

    if (!user || password !== user.password) {
      return "닉네임 또는 패스워드가 틀렸습니다.";
    }
    
    return token;
  };
}

module.exports = SignService;
