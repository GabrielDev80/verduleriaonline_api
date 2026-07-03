import * as userServices from "../services/users.service.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();
const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();

    res.status(200).json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    log.error("Internal Server Error", error);
    res.status(500).json({
      status: "error",
      messaje: "Internal Server Error",
      error,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (!user) {
      log.error("User Not Found");
      res.status(404).json({
        status: "error",
        messaje: "User Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    log.error("Internal Server Error", error);
    res.status(500).json({
      status: "error",
      messaje: "Internal Server Error",
      error,
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      log.error("User Not Found");
      res.status(404).json({
        status: "error",
        messaje: "User Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    log.error("Internal Server Error", error);
    res.status(500).json({
      status: "error",
      messaje: "Internal Server Error",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await userServices.updateUserById(id, data);
    if (!user) {
      log.error("User Not Found");
      res.status(404).json({
        status: "error",
        messaje: "User Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    log.error("Internal Server Error", error);
    res.status(500).json({
      status: "error",
      messaje: "Internal Server Error",
      error,
    });
  }
};

const updateDeliveryData = async (req, res) => {
  try {
    const { id } = req.params;

    const deliveryData = req.body;

    const user = await userServices.updateDeliveryData(id, deliveryData);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Delivery data updated succesfully",
      payload: user,
    });
  } catch (error) {
    log.error("Internal Server Error", error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updateDeliveryData,
};
