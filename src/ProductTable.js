// src/ProductTable.js
import React, { useState } from 'react';
import Frozen from './Frozen';
import Lunch from './Lunch';
import OrderForm from './OrderForm';  // Import OrderForm
import { calculateAmount, calculateTotalFrozenAmount } from './utils';
import { useAppContext } from './AppContext';

const ProductTable = ({ products }) => {
  const [productList, setProductList] = useState(products);
  // const [selectedOption, setSelectedOption] = useState();


  const totalFrozenAmount = calculateTotalFrozenAmount(productList, calculateAmount);
  const { totalCookedAmountWeeks } = useAppContext();
  const totalAmount = totalFrozenAmount + totalCookedAmountWeeks;

  const handleQuantityChange = (index, value, type) => {
    const updatedProducts = [...productList];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [type]: parseInt(value, 10) || 0
    };
    setProductList(updatedProducts);
  };

  const handleQuantityUpdate = (index, change, type) => {
    const updatedProducts = [...productList];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [type]: Math.max((updatedProducts[index][type] || 0) + change, 0)
    };
    setProductList(updatedProducts);
  };

  const handleOptionChange = (index, value) => {
    const updatedProducts = [...productList];
    updatedProducts[index] = {
      ...updatedProducts[index],
      cookedOption: value
    };
    setProductList(updatedProducts);
  };

  const handleOnFocus = (index, type) => {
    setProductList(prevProductList => {
      const updatedProducts = [...prevProductList];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [type]: 0,
        ...(type === 'cookedQuantity' && { cookedOption: null })
      };
      return updatedProducts;
    });
  };

  return (
    <div className="container">
        <>
          <Frozen
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onFocus={handleOnFocus}
          />
          <Lunch
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onOptionChange={handleOptionChange}
            onFocus={handleOnFocus}
          />
        <OrderForm totalAmount={totalAmount} productList={ productList } />
        </>
      {/* )} */}
    </div>
  );
};

export default ProductTable;
