import express from "express";
import bodyParser from "body-parser";
import { router } from "./app/routes";
export class App {
  private _server: express.Application;

  constructor() {
    this._server = express();
    this.useBodyParser();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
  }
  
  private useBodyParser() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private router() {
    this.server.use(router);
  }

  public get server() {
    return this._server;
  }
}
