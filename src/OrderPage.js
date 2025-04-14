// src/OrderPage.js
import React, { useMemo, useState } from 'react';
import Frozen from './Frozen';
import Lunch from './Lunch';
import OrderForm from './OrderForm';
import { FrozenProvider } from './Context/FrozenContext';
import { UserProvider } from "./Context/Note-userContext";
import { LunchProvider } from './Context/LunchContext';

import OrderPreview from './OrderPreview';
import Note from './Note';

const products = [
  {
    name: 'Simply Pork',
    frozenPrice: '50k',
    cookedPrice: '70k',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: true,
    isLunch: true,
  },
  {
    name: 'Juicy Shrimp & Pork',
    frozenPrice: '70k',
    cookedPrice: '90k',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: true,
    isLunch: true,
  },
  {
    name: 'Mix 2 above',
    frozenPrice: '60k',
    cookedPrice: '80k',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: false,
    isLunch: true,
  },
  {
    name: 'Simple Shrimp',
    frozenPrice: '80k',
    cookedPrice: '',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: true,
    isLunch: false,

  },
  {
    name: 'Cheese Burger',
    frozenPrice: '80k',
    cookedPrice: '',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: true,
    isLunch: false,

  },
  {
    name: 'Chicken & Cabbage',
    frozenPrice: '50k',
    cookedPrice: '',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: true,
    isLunch: false,

  },
  {
    name: 'Chicken & Shrimp',
    frozenPrice: '80k',
    cookedPrice: '',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
    isFrozen: true,
    isLunch: false,

  }
];

const OrderPage = () => {

const [productList, setProductList] = useState(products);

const frozenProducts = useMemo(
  () => productList.filter(product => product.isFrozen),
  [productList]
);
const lunchProducts = useMemo(
  () => productList.filter(product => product.isLunch),
  [productList]
);
  
  // nhập input số lượng
  const handleQuantityChange = (productName, value, type) => {
  setProductList(prev =>
    prev.map(product =>
      product.name === productName
        ? { ...product, [type]: Math.max(0, parseInt(value, 10) || 0) }
        : product
    )
  );
};
  
  const handleQuantityUpdate = (productName, change, type) => {
  setProductList(prev =>
    prev.map(product => {
      if (product.name !== productName) return product;

      let newQuantity = (product[type] || 0) + change;

      // if (product.name === 'Simple Shrimp' || product.name === 'Cheese Burger') {
      //   newQuantity = Math.ceil(newQuantity / 10) * 10;
      //   if (newQuantity === 10) newQuantity = 20;
      // }

      newQuantity = Math.max(newQuantity, 0);

      if (newQuantity === product[type]) return product;

      return { ...product, [type]: newQuantity };
    })
  );
};


  const handleOptionChange = (productName, value) => {
  setProductList(prev =>
    prev.map(product =>
      product.name === productName && product.cookedOption !== value
        ? { ...product, cookedOption: value }
        : product
    )
  );
};


  const handleOnFocus = (productName, type) => {
  setProductList(prev =>
    prev.map(product =>
      product.name === productName
        ? {
            ...product,
            [type]: 0,
            ...(type === 'cookedQuantity' && { cookedOption: null })
          }
        : product
    )
  );
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
  <UserProvider>
    <FrozenProvider>
      <LunchProvider>
        <div className="container" style={{padding: "0 0.5rem"}}>
          <Frozen
            frozenProductList={frozenProducts}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onFocus={handleOnFocus}
            onClearAll={handleClearAll}
          />

          <Lunch
            lunchProductList={lunchProducts}
            onQuantityChange={handleQuantityChange}
            onQuantityUpdate={handleQuantityUpdate}
            onOptionChange={handleOptionChange}
            onFocus={handleOnFocus}
            onClearAll={handleClearAll}
          />

          <Note />
          <OrderPreview productList={productList} />
          <OrderForm productList={productList} />
        </div>
      </LunchProvider>
    </FrozenProvider>
  </UserProvider>
);


};

export default OrderPage;
