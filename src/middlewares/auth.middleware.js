import getLogger from "../utils/logger.utils.js";
const log = getLogger();

export const isCompleteData = (req, res, next) => {
  // log.info("authMiddleware - isCompletData(request): ", req.body);
  if (!req.body || Object.keys(req.body).length === 0) {
    log.error("authMiddleware - isCompletData(request): Empty Request");
    return res.status(400).json({
      status: "error",
      message: "Empty request",
    });
  }

  const { username, email, password } = req.body;

  if (!username?.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Username is required",
    });
  }

  if (!email?.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }

  if (!password?.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Password is required",
    });
  }

  next();
};
