import express from "express";
import "dotenv/config";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db";
import rootRouter from "./routers/rootRouter";
import introRouter from "./routers/introRouter";
import treatRouter from "./routers/treatRouter";
import adminRouter from "./routers/adminRouter";
import noticeRouter from "./routers/noticeRouter";
import { localsMiddleware, page404Middleware } from "./middlewares";

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

app.use(localsMiddleware);
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/intro", introRouter);
app.use("/treatment", treatRouter);
app.use("/admin", adminRouter);
app.use("/notice", noticeRouter);
app.use(page404Middleware);

const handleListening = () => console.log(`Server listening on port ${PORT}`);

app.listen(PORT, handleListening);
