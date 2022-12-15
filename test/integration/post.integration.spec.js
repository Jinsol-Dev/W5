const supertest = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models");

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") await sequelize.sync();
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});

describe("Post의 통합테스트", () => {
  test("POST localhost:3000/posts success", async () => {
    const requestBody = { title: "통합", content: "테스트" };
    const response = await supertest(app).post("/posts").send(requestBody).set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoicXdlciIsImlhdCI6MTY3MTExNDQ1Nn0.91faytOD5VhHsOw04wVGbbApsg9KycndyQCsIJWrlKc");
    // .set('cookie', `token=${req.cookies.token}`).send(createPostRequestBodyParams)
    // const signupReponse = await supertest(app).post("/signup").send({
    //   nickname: "4321",
    //   password: "1234",
    //   confirm: "1234",
    // });

    // const token = await supertest(app).post("/login").send({
    //   nickname: "4321",
    //   password: "1234",
    // });

    // const responseLocals = { user: { userId: 1, nickname: 1 } };
    // const response = await supertest(app).post("/posts").set('Cookie', [`token=${token}`]).send(requestBody);
    expect(response.status).toEqual(200);
  });
});

afterAll(async () => {
  if (process.env.NODE_ENV === "test") await sequelize.sync({ force: true });
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});
