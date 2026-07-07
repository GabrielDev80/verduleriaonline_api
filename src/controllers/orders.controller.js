import * as orderServices from "../services/orders.service.js";
export const createOrder = async (req, res, next) => {
  // console.log(
  //   "orders.controller - createOrder (backend) - req.body: ",
  //   req.body,
  // );
  try {
    const order = await orderServices.createOrder(req.user.id, req.body);

    res.status(201).json({
      status: "success",
      payload: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getUserOrders(req.user.id);

    res.status(200).json({
      status: "success",
      payload: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrderById = async (req, res, next) => {
  try {
    const order = await orderServices.getUserOrderById(
      req.user.id,
      req.params.oid,
    );

    res.status(200).json({
      status: "success",
      payload: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getAllOrders();

    res.status(200).json({
      status: "success",
      message: "All orders have been successfully located.",
      payload: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await orderServices.getOrderById(orderId);

    res.status(200).json({
      status: "success",
      message: "Order have been successfully located.",
      payload: order,
    });
  } catch (error) {
    next(error);
  }
};
