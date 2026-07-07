import Order from "../models/order.model.js";
import { AppError } from "../utils/errors.js";
import { getCartDocument, clearCart } from "./carts.service.js";
import { getNextSequence } from "../utils/counter.utils.js";
import { COUNTERS } from "../constants/counters.constants.js";
import { validateCartProducts, validateStock } from "../utils/carts.utils.js";

const buildOrderNumber = (sequence) => {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  return `MH-${yyyy}${mm}${dd}-${String(sequence).padStart(5, "0")}`;
};

const buildOrderProducts = (cartProducts) => {
  return cartProducts.map((item) => {
    // console.log(
    //   "buildOrderProducts - orders.service (backend) cartProducts - item(map): ",
    //   item,
    // );

    const unitPrice = item.product.sales_price;
    const quantity = item.quantity;

    return {
      product: item.product._id,
      name: item.product.name,
      sales_unit: item.product.sales_unit,
      quantity,
      unit_price: unitPrice,
      subtotal: unitPrice * quantity,
    };
  });
};

const calculateSubtotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.subtotal;
  }, 0);
};

const calculateDeliveryCost = (delivery) => {
  // Por ahora el envío es gratis.
  // Más adelante acá podremos calcular según zona.
  return 0;
};

const calculateTotal = (subtotal, deliveryCost) => {
  return subtotal + deliveryCost;
};

const discountStock = async (cartProducts) => {
  for (const item of cartProducts) {
    item.product.stock.quantity -= item.quantity;

    await item.product.save();
  }
};

export const createOrder = async (userId, checkoutDTO) => {
  const cart = await getCartDocument(userId);

  if (!cart.products.length) {
    throw new AppError("El carrito está vacío", 400);
  }

  validateCartProducts(cart.products);
  validateStock(cart.products);

  const sequence = await getNextSequence(COUNTERS.ORDER);
  const orderNumber = buildOrderNumber(sequence);
  const orderProducts = buildOrderProducts(cart.products);
  const subtotal = calculateSubtotal(orderProducts);
  const deliveryCost = calculateDeliveryCost(checkoutDTO.delivery);
  const total = calculateTotal(subtotal, deliveryCost);

  const order = await Order.create({
    user: userId,
    order_number: orderNumber,
    customer: checkoutDTO.customer,
    delivery: checkoutDTO.delivery,
    payment: checkoutDTO.payment,
    products: orderProducts,
    subtotal,
    delivery_cost: deliveryCost,
    total,
    notes: checkoutDTO.notes,
  });

  await discountStock(cart.products);

  await clearCart(userId);

  return order;
};

export const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId })
    .select("order_number status total delivery.type payment.method createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return orders;
};

export const getUserOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).lean();

  if (!order) {
    throw new AppError("Pedido no encontrado", 404);
  }

  return order;
};

/* Admin Services */
export const getAllOrders = async () => await Order.find();
export const getOrderById = async (orderId) => {
  const order = await Order.findOne({ _id: orderId }).exec();

  if (!order) {
    throw new AppError("Order bot found", 404);
  }

  return order;
};
