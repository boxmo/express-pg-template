import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes";
import connection from "./database/connection";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
