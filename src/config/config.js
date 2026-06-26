import dotenv from "dotenv";

const config = {};

const environment = process.env.NODE_ENV || "development"; // change environment to 'production', 'development'or 'testing'.

dotenv.config({
  path:
    environment === "development"
      ? ".env.development"
      : environment === "testing"
        ? ".env.testing"
        : ".env.production",
});

config.environment = {
  env: process.env.NODE_ENV,
};

config.url = {
  url: process.env.BASE_URL,
};

config.server = {
  port: process.env.PORT,
};

config.dbClient = {
  client: process.env.DB_CLIENT,
};

config.db = {
  cs: process.env.MONGO_URI,
  dbUser: process.env.MONGO_USER,
  dbPass: process.env.MONGO_PASS,
  dbName: process.env.MONGO_NAME,
  testing: process.env.MONGO_TEST,
};

config.session = {
  secret: process.env.SESSION_SECRET,
  ttl: process.env.SESSION_TTL,
};

config.jwt = {
  secret: process.env.JWT_SECRET,
  expire: process.env.JWT_EXPIRE,
};

// console.log("config.js: ", config);

export default config;
