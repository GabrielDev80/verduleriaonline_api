/********** APP **********/

import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import __dirname from "./dirname.js";

import indexRouter from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

/* Express */
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(`${__dirname}/public`));

/* Morgan */
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Modo Huerta Online API running 🚀",
  });
});

/* Routes */
app.use(indexRouter);

app.use(errorHandler);

export default app;
