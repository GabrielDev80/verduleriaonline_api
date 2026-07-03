import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import { cartDTO } from "../dto/carts.dto.js";

// ========================
// Helpers
// ========================

const createCart = async () => {
  return await Cart.create({ products: [] });
};

const populateCart = async (cartId) => {
  return await Cart.findById(cartId).populate("products.product");
};

const getUserCart = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("Usuario no encontrado");

  let cart = await Cart.findById(user.cart);

  if (!cart) {
    cart = await createCart();
    user.cart = cart._id;
    await user.save();
  }

  return await Cart.findById(cart._id).populate("products.product");
};
// ========================
// Public Services
// ========================

// Obtener carrito
export const getCartByUserId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuario no encontrado");
  if (!user.cart) throw new Error("Carrito no encontrado");

  const cart = await populateCart(user.cart);
  return cartDTO(cart);
};

// Agregar producto
export const addProduct = async (userId, productId, quantity) => {
  const cart = await getUserCart(userId);

  const existingProduct = cart.products.find(
    (item) => String(item.product) === String(productId),
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  return cartDTO(await populateCart(cart._id));
};

// Actualizar cantidad
export const updateProductQuantity = async (userId, productId, quantity) => {
  const cart = await getUserCart(userId);

  const item = cart.products.find(
    (item) => String(item.product._id) === String(productId),
  );

  if (!item) {
    throw new Error("Producto no encontrado en el carrito");
  }

  item.quantity = quantity;

  await cart.save();

  return cartDTO(await populateCart(cart._id));
};

// Eliminar producto
export const removeProduct = async (userId, productId) => {
  const cart = await getUserCart(userId);

  cart.products = cart.products.filter(
    (item) => String(item.product._id) !== String(productId),
  );

  await cart.save();

  return cartDTO(await populateCart(cart._id));
};

// Vaciar carrito
export const clearCart = async (userId) => {
  const cart = await getUserCart(userId);

  cart.products = [];

  await cart.save();

  return cartDTO(await populateCart(cart.id));
};

// Obtener documento crudo (debug / internal)
export const getCartDocument = async (userId) => {
  const user = await User.findById(userId);

  if (!user?.cart) {
    throw new Error("Carrito no encontrado");
  }

  return await Cart.findById(user.cart).populate("products.product");
};
