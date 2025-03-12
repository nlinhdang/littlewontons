// src/OrderPage.js
import React, { useState } from 'react';
import Frozen from './Frozen';
import Lunch from './Lunch';
import OrderForm from './OrderForm';  // Import OrderForm
import { calculateAmount, calculateTotalFrozenAmount } from './utils';
import { useAppContext } from './AppContext';
import OrderPreview from './OrderPreview';
import Note from './Note';

const OrderPage = ({ products }) => {

  const [productList, setProductList] = useState(products);

  const frozenProducts = productList.filter(product => product.isFrozen);
  const lunchProducts = productList.filter(product => product.isLunch);

  const totalFrozenAmount = calculateTotalFrozenAmount(productList, calculateAmount);
  const { totalCookedAmountWeeks } = useAppContext();
  const totalAmount = totalFrozenAmount + totalCookedAmountWeeks;

  // nhập input số lượng
  const handleQuantityChange = (index, value, type) => {
    setProductList(prevProductList => {
      const updatedProducts = [...prevProductList];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [type]: parseInt(value, 10) || 0
      };
      return updatedProducts;
    });
  };

  // sử dụng nút tăng giảm
  const handleQuantityUpdate = (index, change, type) => {
  setProductList(prevProductList => {
    const updatedProducts = [...prevProductList];
    const { name } = updatedProducts[index];
    let newQuantity = (updatedProducts[index][type] || 0) + change;

    if (name === 'Simple Shrimp' || name === 'Cheese Burger') {
      if (newQuantity === 10) {
        newQuantity = 20; // ✅ Nếu <=10, đưa về 0
      // } else if (newQuantity === 20 && change < 0) {
      //   newQuantity = 0; // ✅ Nếu đang ở 20 và nhấn "-", đưa về 0
      // } else if (newQuantity < 20) {
      //   newQuantity = 20; // ✅ Nếu vượt 0 nhưng <20, đặt về 20
      } else {
        newQuantity = Math.ceil(newQuantity / 10) * 10; // ✅ Chỉ nhận bội số của 10 từ 20 trở lên
      }
      console.log(newQuantity)
    }

    newQuantity = Math.max(newQuantity, 0); // ✅ Đảm bảo không có số âm

    updatedProducts[index] = { ...updatedProducts[index], [type]: newQuantity };
    return updatedProducts;
  });
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

  const handleClearAll = (types) => {
  setProductList(prevProductList => 
    prevProductList.map(product => {
      const updatedProduct = { ...product };
      types.forEach(type => {
        updatedProduct[type] = 0; // Đặt giá trị của mỗi type về 0
      });
      return updatedProduct;
    })
  );
};

  return (
    <div className="container">
      <>
        <Frozen
          productList={frozenProducts}
          onQuantityChange={handleQuantityChange}
          onQuantityUpdate={handleQuantityUpdate}
          onFocus={handleOnFocus}
          onClearAll={handleClearAll}
        />
        <Lunch
          productList={lunchProducts}
          onQuantityChange={handleQuantityChange}
          onQuantityUpdate={handleQuantityUpdate}
          onOptionChange={handleOptionChange}
          onFocus={handleOnFocus}
          onClearAll={handleClearAll}
        />
        <Note />
        <OrderPreview totalAmount={totalAmount} productList={productList} />
        <OrderForm totalAmount={totalAmount} productList={productList} />
      </>
      
    </div>
  );
};

export default OrderPage;
