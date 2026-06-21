import mongoose from "mongoose";
import config from "./config.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    await mongoose.connect(config.db.cs, {
      dbName: config.db.dbName,
    });

    isConnected = true;
    log.info("Connected to MongoDB succesfully");
  } catch (error) {
    log.fatal(`*** MongoDB connection error ***: ${error.message}`);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  log.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  log.error(`*** MongoDB connection error ***: ${error.message}`);
});
