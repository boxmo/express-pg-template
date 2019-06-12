import User from "../models/User";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({
      user,
      token: user.generateToken()
    });
  }
}

export default new SessionsController();
