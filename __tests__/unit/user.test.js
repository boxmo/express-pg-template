import bcrypt from "bcryptjs";
import User from "../../src/app/models/User";
import truncate from "../utils/truncate";

describe("Users", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Mozart Brum",
      email: "mztbrum@gmail.com",
      password: "123456"
    });

    const compareHash = await bcrypt.compare("123456", user.password_hash);
    expect(compareHash).toBe(true);
  });
});
