export const cartDTO = (cart) => {
  const products = cart.products.map((item) => {
    const subtotal = item.quantity * item.product.sales_price;

    return {
      productId: item.product._id,
      name: item.product.name,
      description: item.product.description,
      image: item.product.image,
      sales_price: item.product.sales_price,
      sales_unit: item.product.sales_unit,
      quantity: item.quantity,
      subtotal: subtotal,
    };
  });

  const total = products.reduce((acc, item) => acc + item.subtotal, 0);

  return {
    id: cart._id,
    products,
    total: Number(total.toFixed(2)),
  };
};
