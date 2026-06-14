export const productDTO = (productfromDB) => {
  const {
    _id,
    name,
    description,
    category,
    image,
    stock,
    sales_price,
    sales_unit,
    observations,
    active,
  } = productfromDB;

  return {
    id: _id,
    name,
    description,
    category,
    image,
    stock,
    sales_price,
    sales_unit,
    observations,
    active,
  };
};
