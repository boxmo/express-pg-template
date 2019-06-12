import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING
      },
      {
        sequelize
      }
    );

    this.addHooks();

    return this;
  }

  static addHooks() {
    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  // ASSOCIATION EXAMPLE
  /* static associate(models) {
      this.belongsTo(models.Example, { foreignKey: "example_id", as: "example" });
     }
 */

  // INSTANCE METHODS
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  }
}
