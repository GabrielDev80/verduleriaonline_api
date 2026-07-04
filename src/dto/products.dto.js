import { cleanText, capitalizeWords } from "../utils/normalize.utils.js";
import {
  calculateProfitAmount,
  calculateSalePrice,
  generateProductCode,
  roundSalePrice,
} from "../utils/products.utils.js";

export const productResponseDTO = (productfromDB) => {
  const {
    _id,
    code,
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
    code,
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

export const createProductDTO = async (body) => {
  const {
    name,
    description,
    category,
    image,
    sales_unit,
    stock,
    observations,
    purchase_info,
    profit_percentage,
  } = body;

  const normalizedCategory = cleanText(category).toLowerCase();

  const code = await generateProductCode(normalizedCategory);

  const normalizedImage = image.trim().toLowerCase();

  const packageCost = Number(purchase_info.package_cost);
  const quantity = Number(purchase_info.quantity);
  const unit = cleanText(purchase_info.unit).toLowerCase();

  const unitCost = packageCost / quantity;

  const salesPrice = calculateSalePrice(unitCost, Number(profit_percentage));

  console.log("stock:", stock);
  console.log("stock.quantity:", stock?.quantity);

  return {
    code,

    name: capitalizeWords(name),
    description: cleanText(description),
    category: normalizedCategory,
    image: `/products/${normalizedCategory}/${normalizedImage}`,

    sales_price: roundSalePrice(salesPrice),
    sales_unit: cleanText(sales_unit).toLowerCase(),

    profit_percentage: Number(profit_percentage),
    profit_amount: calculateProfitAmount(salesPrice, unitCost),

    observations: cleanText(observations),

    stock: {
      quantity: Number(stock.quantity),
      unit,
    },
    purchase_info: {
      package_cost: packageCost,
      quantity: quantity,
      unit,
      unit_cost: unitCost,
    },
  };
};

export const updateProductDTO = (body) => {};
