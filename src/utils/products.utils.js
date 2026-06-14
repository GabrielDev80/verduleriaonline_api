const calculateUnitCost = (package_cost, quantity) => {
  if (!(package_cost || quantity)) {
    return 0;
  }
  const unitCost = package_cost / quantity;

  return unitCost;
};

const calculateSalePrice = (unitCost, margin = 50) => {
  const salesPrice = unitCost + (unitCost * margin) / 100;

  return Math.round(salesPrice);
};
const roundSalePrice = (salesPrice) => {
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

const calculateProfitAmount = (salesPrice, unitCost) => {
  const profitAmount = salesPrice - unitCost;

  return profitAmount;
};

export {
  calculateUnitCost,
  calculateSalePrice,
  roundSalePrice,
  calculateProfitAmount,
};
