import getLogger from "../utils/logger.utils.js";

const log = getLogger();

const errorHandler = (err, req, res, next) => {
  log.error(err);
  console.error("error: ", err);
  console.error("error.stack: ", err.stack);
  console.dir("dir error: ", err, { depth: null });

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
