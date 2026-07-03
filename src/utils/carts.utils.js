export const validateCartProducts = (cartProducts) => {
  for (const item of cartProducts) {
    if (!item.product) {
      throw new Error("Uno de los productos ya no existe.");
    }

    if (!item.product.active) {
      throw new Error(`${item.product.name} ya no está disponible.`);
    }

    if (item.product.sales_price <= 0) {
      throw new Error(`${item.product.name} no tiene un precio válido.`);
    }
  }
};

export const validateStock = (cartProducts) => {
  for (const item of cartProducts) {
    if (item.quantity > item.product.stock) {
      throw new Error(`No hay stock suficiente para ${item.product.name}`);
    }
  }
};
