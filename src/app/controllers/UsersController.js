import User from "../models/User";

class UsersController {
  async me(req, res) {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ mesage: "User not found" });
    }

    res.json({ user });
  }
}

export default new UsersController();
