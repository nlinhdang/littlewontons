// src/ProductTable.js
import React, { useState } from 'react';
import Frozen from './Frozen';
import Lunch from './Lunch';
import OrderForm from './OrderForm';  // Import OrderForm
import { calculateAmount, calculateTotalFrozenAmount } from './utils';
import { useAppContext } from './AppContext';

const ProductTable = ({ products, onOptionChange }) => {
  const [productList, setProductList] = useState(products);
  const [selectedOption, setSelectedOption] = useState();
  const [deliveryLocation, setDeliveryLocation] = useState(null); // Default value
  const [deliveryTime, setDeliveryTime] = useState(null); // Default value
  
  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
    onOptionChange(); // Gọi hàm khi chọn option
  };

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

  const handleDeliveryLocationChange = (event) => {
    setDeliveryLocation(event.target.value);
  };

  const handleDeliveryTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };

  return (
    <div className="container">
      <div className="header-container">
        <div className="sticky-container">
          <p>What kind of Little wontons would you like to order?</p>
          <div className="header-options">

            <label>
              <input
                type="radio"
                value="both"
                checked={selectedOption === 'both'}
                onChange={handleOptionSelect}
              />
              Both
            </label>
            <label>
              <input
                type="radio"
                value="frozen"
                checked={selectedOption === 'frozen'}
                onChange={handleOptionSelect}
              />
              Only Frozen
            </label>
            <label>
              <input
                type="radio"
                value="cooked"
                checked={selectedOption === 'cooked'}
                onChange={handleOptionSelect}
              />
              Only Lunch box
            </label>
          </div>
        </div>
      </div>
      {selectedOption === 'frozen' && (
        <>
          <Frozen
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onFocus={handleOnFocus}
            deliveryLocation={deliveryLocation}
            onDeliveryLocationChange={handleDeliveryLocationChange}
          />
          <OrderForm totalAmount={totalFrozenAmount} /> 
        </>
      )}

      {selectedOption === 'cooked' && (
        <>
          <Lunch
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onOptionChange={handleOptionChange}
            onFocus={handleOnFocus}
            deliveryTime={deliveryTime}
            onDeliveryTimeChange={handleDeliveryTimeChange}
          />
          <OrderForm totalAmount={totalCookedAmountWeeks} /> {/* Pass totalAmount */}
        </>
      )}

      {selectedOption === 'both' && (
        <>
          <Frozen
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onFocus={handleOnFocus}
            deliveryLocation={deliveryLocation}
            onDeliveryLocationChange={handleDeliveryLocationChange}
          />
          <Lunch
            productList={productList}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onOptionChange={handleOptionChange}
            onFocus={handleOnFocus}
            deliveryTime={deliveryTime}
            onDeliveryTimeChange={handleDeliveryTimeChange}
          />
            {console.log(totalCookedAmountWeeks)}
          <OrderForm totalAmount={totalAmount} />
        </>
      )}
    </div>
  );
};

export default ProductTable;
