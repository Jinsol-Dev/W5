const supertest = require("supertest");
const app = require("../../app");
const { Posts } = require("../../models");

describe("Post의 통합테스트", () => {
  test("POST localhost:3000/posts success", async () => {
    const responseLocals = { user: { userId: 1, nickname: 1 } };
    const requestBody = { title: "통합", content: "테스트" };
    const response = await supertest(app).post("/posts").send(requestBody, responseLocals);
  });
});
