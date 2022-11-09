import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./config/routes";
import * as cors from "cors";
import * as path from 'path'

const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};


class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(express.static('build'));
    this.app.use(bodyParser.json({ limit: "400mb" }));
    this.app.use(bodyParser.urlencoded({ extended: false, limit: "400mb" }));
    this.app.use(express.static(path.join('public')))
    this.app.use(cors(corsOptions));
  }
}

export default new App().app;
