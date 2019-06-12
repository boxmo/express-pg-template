import request from "supertest";
import app from "../../src/app";
import truncate from "../utils/truncate";
import factory from "../factories";

describe("Users Routes", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should return user data when id given", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.body).toHaveProperty("user");
  });
});
