/********** SERVER **********/
import app from "./app.js";
import config from "./config/config.js";
import getLogger from "./utils/logger.utils.js";
import { connectDB } from "./config/mongoConnection.js";

const log = getLogger();
const port = config.server.port;

/* Start Server */
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      log.info(
        `Server running on port ${port}, in ${config.environment.env} mode.`,
      );
    });
    return server;
  } catch (error) {
    log.fatal(`*** CONNECTION STARTUP ERROR ***: , ${error.message}`);
    process.exit(1);
  }
};

const server = await startServer();

export default server;
