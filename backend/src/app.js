
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config()

import config from "./config/variables.config";
import PSQLStorage from "./storage/psql.storage";
import ErrorHandlerMiddleware from "./middlewares/error-handler.middleware";
import Api from "./api";


const { CORS, DISABLE_REQUEST_LOG } = config;

class App {

  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(cors());
    
    this.app.use("/upload", express.static("upload"));

    this.app.use(session({
      secret : process.env.SESSION_SECRET,
    }));
    this.app.use(passport.initialize())
    this.app.use(passport.session())
  }


  async init(server) {
    await App._initializeStorage();
    this._setRequestLogger();
    this._setCors();
    this._setRequestParser();
    this._initializeApi();
    this._setErrorHandler();
  }


  _setRequestLogger() {
    if (DISABLE_REQUEST_LOG !== "1") {
      this.app.use(morgan("dev"));
    }
  }


  _setCors() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type", "Origin"],
        credentials: true,
        optionsSuccessStatus: 200,
        maxAge: -1,
      })
    );
  }


  _setRequestParser() {
    this.app.use(bodyParser.json());
    const options = { limit: "200mb", extended: false };
    this.app.use(bodyParser.urlencoded(options));
    this.app.use(express.json());
  }

  /**
   * @private
   * @description 
   */
  static _initializeStorage() {
    return PSQLStorage.init();
  }

  _initializeApi() {
    this.app.use("/api/v1", Api);
  }

  /**
   * @private
   * @description 
   */
  _setErrorHandler() {
    this.app.use(ErrorHandlerMiddleware.init);
  }
}

export default new App();
