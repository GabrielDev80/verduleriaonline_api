import Cart from "../models/cart.model.js";

// ! Private Service(createCart)
const createCart = async (userId) => {
  return await Cart.create({
    user: userId,
    items: [],
  });
};

export const createUserCart = async () => {
  return await createCart();
};

export const findOrCreateCart = async (user) => {
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
  let cart = await findOrCreateCart(userId);

  return await Cart.findById(cart._id).populate("items.product");
};

// Agregar producto al carrito
export const addProduct = async (userId, productId, quantity = 1) => {
  const cart = await findOrCreateCart(userId);

  const existingProduct = cart.items.find((item) =>
    item.product._id.equals(productId),
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  return await Cart.findById(cart._id).populate("items.product");
};

// Actualizar cantidad
export const updateProductQuantity = async (userId, productId, quantity) => {
  const cart = await findOrCreateCart(userId);

  const item = cart.items.find((item) => item.product._id.equals(productId));

  if (!item) {
    throw new Error("Producto no encontrado en el carrito");
  }

  item.quantity = quantity;

  await cart.save();

  return await Cart.findById(cart._id).populate("items.product");
};

// Eliminar un producto del carrito
export const removeProduct = async (userId, productId) => {
  const cart = await findOrCreateCart(userId);

  cart.items = cart.items.filter(
    (item) => item.product._id.toString() !== productId,
  );

  await cart.save();

  return await Cart.findById(cart._id).populate("items.product");
};

// Vaciar carrito
export const clearCart = async (userId) => {
  const cart = await getCartByUserId(userId);

  cart.items = [];

  await cart.save();

  return cart;
};
