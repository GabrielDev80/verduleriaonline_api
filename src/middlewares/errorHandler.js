import getLogger from "../utils/logger.utils.js";

const log = getLogger();

const errorHandler = (err, req, res, next) => {
  log.error(err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
