import express from "express";
import "regenerator-runtime";
import "dotenv/config";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import "./db";
import rootRouter from "./routers/rootRouter";
import introRouter from "./routers/introRouter";
import treatRouter from "./routers/treatRouter";
import adminRouter from "./routers/adminRouter";
import noticeRouter from "./routers/noticeRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware, page404Middleware } from "./middlewares";
import metaRouter from "./routers/metaRouter";
import favicon from "serve-favicon";
import path from "path";

const app = express();
const PORT = 4000;
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(require("body-parser").json()); // this is the key of getting body by fetch

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));
app.use(favicon(path.join(process.cwd(), "src", "client", "favicon.ico")));
app.use("/", rootRouter);
app.use("/intro", introRouter);
app.use("/treatment", treatRouter);
app.use("/admin", adminRouter);
app.use("/notice", noticeRouter);
app.use("/meta", metaRouter);
app.use("/api", apiRouter);
app.use(page404Middleware);

const handleListening = () => console.log(`Server listening on port ${PORT}`);

app.listen(PORT, handleListening);
