const SignService = require("../services/sign.service");

class SignController {
  constructor() {
    this.signService = new SignService();
  }

  createUser = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;
    try {
      const regex = /^[a-zA-Z0-9]{3,12}$/;
      //비밀번호 일치
      if (password !== confirm) {
        return res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." });
      }
      //비밀번호는 최소 4자 이상
      if (password.length < 4) {
        return res.status(412).json({ errorMessage: "최소 4글자 이상 입력해 주세요." });
      }
      //닉네임과 같은 값이 포함된 경우 회원가입에 실패로 만들기
      if (password.includes(nickname)) {
        return res.status(412).json({ errormessage: "패스워드 형식이 일치하지 않거나, 패스워드에 닉네임이 포함되어 있습니다." });
      }
      //닉네임 형식
      if (!nickname.match(regex)) {
        return res.status(412).json({ errormessage: "닉네임의 형식이 일치하지 않습니다." });
      }
      //비밀번호 4자리 이상
      if (password.length < 4) {
        return res.status(412).json({ errorMessage: "최소 4글자 이상 입력해 주세요." });
      }

      const user = await this.signService.createUser(nickname, password);

      res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ result: "fail", message: "server error" });
    }
  };

  login = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const token = await this.signService.login(nickname, password);

      res.cookie("token", token);

      res.status(200).json({ data: token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "로그인에 실패하였습니다." });
    }
  };
}

module.exports = SignController;
