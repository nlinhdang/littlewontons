// utils.js
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000) + 'M';
  } else if (num >= 1000) {
    return (num / 1000) + 'k';
  }
  return num;
};

export const calculateAmount = (price, quantity, multiplier) => {
  const formattedPrice = parseFloat(price.replace('k', '')) * multiplier;
  return formattedPrice * (quantity || 0);
};

// src/utils/calculations.js

export const calculateTotalFrozenAmount = (productList, calculateAmount) => {
  return productList.reduce((sum, product) => sum + calculateAmount(product.frozenPrice, product.frozenQuantity, 100), 0);
};

