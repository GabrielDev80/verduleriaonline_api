import mongoose from "mongoose";
import config from "./config.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.cs, {
      dbName: config.db.dbName,
    });

    log.info("Connected to MongoDB succesfully");
  } catch (error) {
    log.fatal(`*** MongoDB connection error ***: ${error.message}`);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  log.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  log.error(`*** MongoDB connection error ***: ${error.message}`);
});
