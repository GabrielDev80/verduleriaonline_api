import "dotenv/config";
import config from "./config/config.js";
import express from "express";
import __dirname from "./dirname.js";
import cors from "cors";

import indexRouter from "./routes/index.routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";

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

/* Session */ //!Crear base de datos
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.db.cs,
      ttl: config.session.ttl,
    }),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: config.session.ttl * 1000,
      secure: false, //* Cambiar a true en Producción
      httpOnly: true,
    },
  }),
);
/* Morgan */
app.use(morgan("dev"));

/* Routes */
app.use(indexRouter);

export default app;
