import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import { cartDTO } from "../dto/carts.dto.js";

// ! Private Service(createCart)
const createCart = async () => {
  return await Cart.create({
    products: [],
  });
};
// ! Private Service(populateCart)
const populateCart = async (cartId) => {
  return await Cart.findById(cartId).populate("products.product");
};

export const createUserCart = async () => {
  return await createCart();
};

export const findOrCreateCart = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (user.cart) {
    const cart = await Cart.findById(user.cart);

    if (cart) {
      return cart;
    }
  }

  const cart = await createCart();

  user.cart = cart._id;
  await user.save();

  return cart;
};

// Obtener carrito
export const getCartByUserId = async (userId) => {
  // console.log("cart.service (getCartByUserId) - userId: ", userId);

  const cart = await findOrCreateCart(userId);

  return cartDTO(await populateCart(cart._id));
};

// Agregar producto al carrito
export const addProduct = async (userId, productId, quantity) => {
  const cart = await findOrCreateCart(userId);
  const existingProduct = cart.products.find((item) =>
    item.product._id.equals(productId),
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
  const cart = await findOrCreateCart(userId);

  const item = cart.products.find((item) => item.product._id.equals(productId));

  if (!item) {
    throw new Error("Producto no encontrado en el carrito");
  }

  item.quantity = quantity;

  await cart.save();

  return cartDTO(await populateCart(cart._id));
};

// Eliminar un producto del carrito
export const removeProduct = async (userId, productId) => {
  const cart = await findOrCreateCart(userId);

  cart.products = cart.products.filter(
    (item) => item.product._id.toString() !== productId,
  );

  await cart.save();

  return cartDTO(await populateCart(cart._id));
};

// Vaciar carrito
export const clearCart = async (userId) => {
  const cart = await getCartByUserId(userId);

  cart.products = [];

  return cart;
};
