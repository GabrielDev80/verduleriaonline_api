import * as CartService from "../services/carts.service.js";

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await CartService.getCartByUserId(userId);

    res.status(200).json({
      status: "success",
      payload: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await CartService.addProduct(userId, productId, quantity);

    res.status(200).json({
      status: "success",
      message: "Product successfully added to cart",
      payload: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await CartService.updateProductQuantity(
      userId,
      productId,
      quantity,
    );

    res.status(200).json({
      status: "success",
      message: "Product quantity successfully updated",
      payload: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await CartService.removeProduct(userId, productId);

    res.status(200).json({
      status: "success",
      message: "Product successfully removed from cart",
      payload: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("userId: ", req.user.id);
    await CartService.clearCart(userId);

    res.status(200).json({
      status: "success",
      message: "Cart successfully emptied",
    });
  } catch (error) {
    next(error);
  }
};

// ! Private Controller(createCart)
const createCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await CartService.createCart(userId);

    res.status(201).json({
      status: "success",
      message: "Cart successfully created",
      payload: cart,
    });
  } catch (error) {
    next(error);
  }
};
