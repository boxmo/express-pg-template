import Sequelize from "sequelize";
import config from "../config/database.json";
import models from "../app/models";

const env = process.env.NODE_ENV || "development";
const databaseConfig = config[env];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);
    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database().connection;
