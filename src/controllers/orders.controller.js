import * as orderServices from "../services/orders.service.js";
export const createOrder = async (req, res, next) => {
  // console.log("orders.controller (createOrder) - req.user: ", req.user);
  // console.log("orders.controller (createOrder) - req.user.id: ", req.user.id);
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
