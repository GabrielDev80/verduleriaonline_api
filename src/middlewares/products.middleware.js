export const isDataRequired = (req, res, next) => {
  const { name, description, image, category, purchase_costs } = req.body;
  if (
    !(
      name ||
      description ||
      image ||
      category ||
      purchase_costs.package_cost ||
      purchase_costs.quantity ||
      purchase_costs.unit
    )
  ) {
    log.warn("Datos insuficientes para crear el producto");
    return res.status(400).json({
      status: "error",
      message: "Bad request",
    });
  }

  next;
};
