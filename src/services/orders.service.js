import orderModel from "../models/order.model.js";
import { getCartDocument, clearCart } from "./carts.service.js";
import { getNextSequence } from "../utils/counter.utils.js";
import { COUNTERS } from "../constants/counters.constants.js";
import { validateCartProducts, validateStock } from "../utils/carts.utils.js";

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
    throw new Error("El carrito está vacío");
  }

  validateCartProducts(cart.products);
  validateStock(cart.products);

  const orderNumber = await getNextSequence(COUNTERS.ORDER);
  const orderProducts = buildOrderProducts(cart.products);
  const subtotal = calculateSubtotal(orderProducts);
  const deliveryCost = calculateDeliveryCost(checkoutDTO.delivery);
  const total = calculateTotal(subtotal, deliveryCost);

  const order = await orderModel.create({
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
