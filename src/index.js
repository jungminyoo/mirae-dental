import express from "express";
import "dotenv/config";
import rootRouter from "./routers/rootRouter";
import introRouter from "./routers/introRouter";
import treatRouter from "./routers/treatRouter";
import adminRouter from "./routers/adminRouter";
import noticeRouter from "./routers/noticeRouter";

const app = express();
const PORT = 4000;
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use("/", rootRouter);
app.use("/intro", introRouter);
app.use("/treatment", treatRouter);
app.use("/admin", adminRouter);
app.use("/notice", noticeRouter);

const handleListening = () => console.log(`Server listening on port ${PORT}`);

app.listen(PORT, handleListening);
