import { PRODUCTS_CATEGORIES } from "../constants/product.constants.js";
import { getNextSequence } from "./counter.utils.js";

// Calcular costo unitario de compra
export const calculateUnitCost = (package_cost, quantity) => {
  if (!(package_cost || quantity)) {
    return 0;
  }
  const unitCost = package_cost / quantity;

  return unitCost;
};

// Calcular precio unitario de venta
export const calculateSalePrice = (unitCost, margin = 50) => {
  const salesPrice = unitCost + (unitCost * margin) / 100;

  return Math.round(salesPrice);
};

// Redondear el precio de venta
export const roundSalePrice = (salesPrice) => {
  /* 
  base: Obtiene la centena base (2842 /100 = 28,42) 
  luego Math.floor(28,42) elimina los decimales y redondea hacia abajo = (28)
  base = (28) * 100 = 2800
  */
  const base = Math.floor(salesPrice / 100) * 100;

  /* 
  lastTwo: Obtiene el resto de dividir el precio por 100 (2842 % 100 = 28 * 100 + 42)
  lastTwo = 42
  si (42 <= 25) retorna base (2800) 
  si (42 <= 75) retorna base + 50 (2850) 
  de lo contrario retorna base + 99 (2899) 
  */
  const lastTwo = salesPrice % 100;

  if (lastTwo <= 25) return base;
  if (lastTwo <= 75) return base + 50;
  return base + 99;
};

// Calcular monto de ganancia por producto
export const calculateProfitAmount = (salesPrice, unitCost) => {
  const profitAmount = Number(salesPrice) - Number(unitCost);

  return profitAmount;
};

export const generateProductCode = async (category) => {
  const config = PRODUCTS_CATEGORIES[category];

  if (!config) {
    throw new Error(`Invalid category: ${category}`);
  }

  const next = await getNextSequence(config.counter);

  return `${config.prefix}${String(next).padStart(4, "0")}`;
};
