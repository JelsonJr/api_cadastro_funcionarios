import express from "express";
import { router } from "./routes/router";
export class App {
  private _server: express.Application;

  constructor() {
    this._server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
  }

  private router() {
    this.server.use(router);
  }

  public get server() {
    return this._server;
  }
}
