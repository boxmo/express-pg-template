import request from "supertest";
import app from "../../src/app";
import truncate from "../utils/truncate";
import factory from "../factories";

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: "123456" });
    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "wrong password"
      });

    expect(response.status).toBe(401);
  });

  it("should return JWT token when authenticated", async () => {
    const user = await factory.create("User", { password: "123456" });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without JWT", async () => {
    const user = await factory.create("User");
    const response = await request(app).get("/users/me");

    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes with invalid token", async () => {
    const user = await factory.create("User");
    const response = await request(app)
      .get(`/users/me`)
      .set("Authorization", `Bearer wrongToken`);

    expect(response.status).toBe(401);
  });
});
