import express from "express";
import "dotenv/config";

const app = express();
const PORT = 4000;
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

const handleListening = () => console.log(`Server listening on port ${PORT}`);

app.listen(PORT, handleListening);
