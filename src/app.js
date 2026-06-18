import "dotenv/config";
import config from "./config/config.js";
import express from "express";
import __dirname from "./dirname.js";
import cors from "cors";

import indexRouter from "./routes/index.routes.js";

import morgan from "morgan";
import getLogger from "./utils/logger.utils.js";

/* Logger */
const log = getLogger();

/* Express */
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(`${__dirname}/public`));

/* Morgan */
app.use(morgan("dev"));

/* Routes */
app.use(indexRouter);

export default app;
