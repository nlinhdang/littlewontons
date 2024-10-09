// Lunch.js
import React, { useEffect } from 'react';
import { formatNumber, calculateAmount } from './utils';
import { useAppContext } from './AppContext';

const cookedHeaders = ['Product', 'Price', 'Number of portions in a week', 'Amount', 'Operation'];
const subHeaders = ['Monday', 'Wednesday', 'Friday']; // Thêm sub-headers


const Lunch = ({ productList, onQuantityChange, onQuantityUpdate, onFocus, onClearAll }) => {
  const { deliveryTime, setDeliveryTime, numWeeks, setNumWeeks, setTotalCookedAmountWeeks } = useAppContext();

  const calculateCookedAmount = (cookedPrice, monBoiledQuantity, wedBoiledQuantity, friBoiledQuantity) => {
    return (calculateAmount(cookedPrice, monBoiledQuantity, 1000)
      + calculateAmount(cookedPrice, wedBoiledQuantity, 1000)
      + calculateAmount(cookedPrice, friBoiledQuantity, 1000));
  }
  // Calculate total cooked amount
  const totalCookedAmount1week = productList.reduce((sum, product) => {
    // Gọi calculateCookedAmount cho từng sản phẩm và cộng dồn vào tổng
    const productAmount = calculateCookedAmount(
      product.cookedPrice,
      product.monBoiledQuantity,
      product.wedBoiledQuantity,
      product.friBoiledQuantity
    );
    return sum + productAmount;
  }, 0);

  const handleNumWeeksChange = (e) => {
    setNumWeeks(Number(e.target.value));
  };

  const handleDeliveryTimeChange = (event) => {
    setDeliveryTime(event.target.value);
  };

  // Calculate total amount based on order type
  const totalCookedAmountWeeks = totalCookedAmount1week * numWeeks;

  // Update totalCookedAmountWeeks in Context when totalCookedAmountWeeks changes
  useEffect(() => {
    setTotalCookedAmountWeeks(totalCookedAmountWeeks);
  }, [totalCookedAmountWeeks, setTotalCookedAmountWeeks]);

  return (
    <div className="container">
      <h1>Lunch box</h1>

      <div className="lunch-note">
        To give me enough time to prepare your delicious lunch, please place your order by 6 PM the day before. If it's past 6 PM, just shoot me a message, and I'll check if we still have what you need!
      </div>

      <div className="num-weeks">
        <label>
          Number of weeks:
          <input
            type="number"
            min="1"
            value={numWeeks}
            onChange={handleNumWeeksChange}
          />
        </label>
      </div>

      <div className="grid-container cooked">
        {cookedHeaders.map((header, index) => (
          <div className={`grid-header header${index} ${index === 2 ? 'number-of-portions-header' : ''}`} key={index}>{header}</div>
        ))}

        {/* Sub-header chỉ cho cột "Number of portions in a week" */}
        <div className="subheader-wrapper">
          {subHeaders.map((subHeader, index) => (
            <div className="grid-subheader" key={index}>
              {subHeader}
            </div>
          ))}
        </div>


        <div className="empty-space"></div>
        {/* Product list */}
        {productList.map((product, index) => (
          <React.Fragment key={index}>
            <div className="grid-item product-name">{product.name}</div>
            <div className="grid-item">{product.cookedPrice}</div>
            <div className="grid-item quantity-control sub-grid">
              <label>
                {/* <p className="day-label">Monday - Boiled</p> */}
                <div className="quantity">
                  <button className="quantity-button quantity-button-decrease" onClick={() => onQuantityUpdate(index, -1, 'monBoiledQuantity')}>-</button>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={product.monBoiledQuantity || ''}
                    onChange={(e) => onQuantityChange(index, e.target.value, 'monBoiledQuantity')}
                    onFocus={() => onFocus(index, 'monBoiledQuantity')}
                    placeholder="0"
                    className="quantity-input"
                  />
                  <button className="quantity-button quantity-button-increase" onClick={() => onQuantityUpdate(index, 1, 'monBoiledQuantity')}>+</button>
                </div>
              </label>

              <label>
                {/* <p className="day-label">Wednesday - Boiled</p> */}
                <div className="quantity">
                  <button className="quantity-button quantity-button-decrease" onClick={() => onQuantityUpdate(index, -1, 'wedBoiledQuantity')}>-</button>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={product.wedBoiledQuantity || ''}
                    onChange={(e) => onQuantityChange(index, e.target.value, 'wedBoiledQuantity')}
                    onFocus={() => onFocus(index, 'wedBoiledQuantity')}
                    placeholder="0"
                    className="quantity-input"
                  />
                  <button className="quantity-button quantity-button-increase" onClick={() => onQuantityUpdate(index, 1, 'wedBoiledQuantity')}>+</button>
                </div>
              </label>

              <label>
                {/* <p className="day-label">Friday - Fri</p> */}
                <div className="quantity">
                  <button className="quantity-button quantity-button-decrease" onClick={() => onQuantityUpdate(index, -1, 'friBoiledQuantity')}>-</button>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={product.friBoiledQuantity || ''}
                    onChange={(e) => onQuantityChange(index, e.target.value, 'friBoiledQuantity')}
                    onFocus={() => onFocus(index, 'friBoiledQuantity')}
                    placeholder="0"
                    className="quantity-input"
                  />
                  <button className="quantity-button quantity-button-increase" onClick={() => onQuantityUpdate(index, 1, 'friBoiledQuantity')}>+</button>
                </div>
              </label>
            </div>
            <div className="grid-item amount">
              {formatNumber(calculateCookedAmount(product.cookedPrice, product.monBoiledQuantity, product.wedBoiledQuantity, product.friBoiledQuantity))}
            </div>

            <button className="grid-item reset-button" onClick={() => {
              onFocus(index, 'monBoiledQuantity');
              onFocus(index, 'wedBoiledQuantity');
              onFocus(index, 'friBoiledQuantity');
            }}>
              {product.operation}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="clear-all-container">
        <button className="clear-all-button"
        onClick={() => onClearAll(['monBoiledQuantity', 'wedBoiledQuantity', 'friBoiledQuantity'])}>
              Clear all</button>
      </div>

      <div className="total">Lunch bill: {formatNumber(totalCookedAmountWeeks)}</div>

      {/* Delivery Time Section */}
      <div className="delivery-section delivery-time">
        <p>Select Delivery Time:</p>
        <label>
          <input
            type="radio"
            value="11.05"
            checked={deliveryTime === '11.05'}
            onChange={handleDeliveryTimeChange}
          />
          11.05
        </label>
        <label>
          <input
            type="radio"
            value="12.20"
            checked={deliveryTime === '12.20'}
            onChange={handleDeliveryTimeChange}
          />
          12.20
        </label>
      </div>
    </div>
  );
};

export default Lunch;
