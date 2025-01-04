import supertest, { Response, SuperTest, Test } from "supertest";
import app from "../server";
import { roleTypeEnum } from "../interfaces/User.interface";
const request: SuperTest<Test> = supertest(app);
describe("Test user API endpoints", function () {
  describe("test endpoint: /users", function () {
    it("gets /users", async function () {
      const response: Response = await request.get("/users");
      expect(response.status).toBe(401);
    });
  });

  describe("test endpoint: /users", function () {
    it("post /users", async function () {
      const response: Response = await request
        .post("/users")
        .send({ email: "sss@gmail.com" });
      expect(response.status).toBe(401);
    });
  });

  describe("test endpoint: /users", function () {
    it("patch /users/:id", async function () {
      const response: Response = await request
        .patch("/users/65565")
        .send({ email: "sss@gmail.com" });
      expect(response.status).toBe(401);
    });
  });

  describe("test endpoints after login", function () {
    let token: string;
    beforeAll(async function () {
      //create user and login with it
      await request.post("/auth/login").send({
        email: "employee@gmail.com",
        group: roleTypeEnum.NORMAL,
        name: "employee",
        password: "Aa@123456",
      });
      await request.post("/auth/register").send({
        email: "hr@gmail.com",
        group: roleTypeEnum.HR,
        name: "hr",
        password: "Aa@123456",
      });
    });

    it("test login with normal employee", async function () {
      const response: Response = await request
        .post("/auth/login")
        .send({ email: "employee@gmail.com", password: "Aa@123456" });
      expect(response.status).toBe(403);
    });

    it("test login with hr employee", async function () {
      const response: Response = await request
        .post("/auth/login")
        .send({ email: "hr@gmail.com", password: "Aa@123456" });
      token = response.body.token;
      expect(response.status).toBe(200);
    });

    let userId: string;
    it("test create user after login", async function () {
      const response: Response = await request
        .post("/users")
        .send({
          email: "sssssss@gmail.com",
          password: "Aa@123456",
          name: "test",
          group: roleTypeEnum.NORMAL,
        })
        .set("authorization", `Bearer ${token}`);
      userId = response.body.user.id;
      expect(response.status).toBe(201);
    });

    it("test update user route", async function () {
      const response: Response = await request
        .patch(`/users/${userId}`)
        .send({ name: "hamada" })
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("test not found route", async function () {
      const response: Response = await request.get("/usssssssers");
      expect(response.status).toBe(404);
    });
  });
});
