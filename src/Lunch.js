// Lunch.js
import React, { useEffect } from 'react';
import { formatNumber, calculateAmount } from './utils';
import { useAppContext } from './AppContext';

const cookedHeaders = ['Product', 'Price', 'Number of portions in a week', 'Amount', 'Operation'];
const subHeaders = ['Monday', 'Wednesday', 'Friday']; // Thêm sub-headers


const Lunch = ({ productList, onQuantityChange, onQuantityUpdate, onFocus, onClearAll }) => {

  const { handleSelectSectionChange, lunchSauce, setLunchSauce, cutlery, setCutlery, deliveryTime, setDeliveryTime, numWeeks, setNumWeeks, setTotalCookedAmountWeeks } = useAppContext();

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

  // Calculate total amount based on order type
  const totalCookedAmountWeeks = totalCookedAmount1week * numWeeks;

  // Update totalCookedAmountWeeks in Context when totalCookedAmountWeeks changes
  useEffect(() => {
    setTotalCookedAmountWeeks(totalCookedAmountWeeks);
  }, [totalCookedAmountWeeks, setTotalCookedAmountWeeks]);

  const handleSauceChange = (event) => {
    const value = event.target.value;

    if (value === "no") {
      // Nếu "Không lấy nước chấm" được chọn, xóa tất cả các lựa chọn khác và chỉ giữ "no"
      setLunchSauce(["no"]);
    } else {
      // Nếu có lựa chọn khác ngoài "no" thì loại bỏ "no" khỏi mảng nếu nó có
      const newSelectedSauces = lunchSauce.filter(sauce => sauce !== "no");

      // Kiểm tra nếu đã được chọn thì bỏ chọn nó
      if (newSelectedSauces.includes(value)) {
        setLunchSauce(newSelectedSauces.filter(sauce => sauce !== value));
      } else {
        // Chỉ cho phép thêm nếu số lượng hiện tại < 2
        if (newSelectedSauces.length === 2) {
          setLunchSauce([newSelectedSauces[0], value]);
        } else {
          setLunchSauce([...newSelectedSauces, value]);
        }
      }
    }

    console.log(lunchSauce);
    
  };

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
            <div className="grid-item quantity-control">
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


        <button className="clear-all-button"
          onClick={() => onClearAll(['monBoiledQuantity', 'wedBoiledQuantity', 'friBoiledQuantity'])}>
          Clear all</button>


      </div>

      <div className="total">Lunch bill: {formatNumber(totalCookedAmountWeeks)}</div>

      {/* Choose sauce */}
      <div className="select-section sauce-section">
        <p>Little Wontons like to be dipped in sauce. Choose up to 2 sauces!</p>
        <label>
          <input
            type="checkbox"
            value="chili-oil"
            checked={lunchSauce.includes('chili-oil')}
            onChange={handleSauceChange}
          /> Chili oil
        </label>
        <label>
          <input
            type="checkbox"
            value="soy-sauce"
            checked={lunchSauce.includes('soy-sauce')}
            onChange={handleSauceChange}
          /> Soy sauce
        </label>
        <label>
          <input
            type="checkbox"
            value="sweet-chili"
            checked={lunchSauce.includes('sweet-chili')}
            onChange={handleSauceChange}
          /> Sweet Chili
        </label>
        <label>
          <input
            type="checkbox"
            value='no'
            checked={lunchSauce.includes('no')}
            onChange={handleSauceChange}
          /> Or not.
        </label>
      </div>

      {/* Cutlery Section */}
      <div className="select-section cutlery-section">
        <p>Would you like one-time-use chopsticks?</p>
        <label>
          <input
            type="radio"
            value="yes"
            checked={cutlery === "yes"}
            onChange={(event) => {
              handleSelectSectionChange(event, setCutlery)
            }}
          />Yes
        </label>
        <label>
          <input
            type="radio"
            value="no"
            checked={cutlery === "no"}
            onChange={(event) => {
              handleSelectSectionChange(event, setCutlery)
            }}
          />No
        </label>
      </div>

      {/* Delivery Time Section */}
      <div className="select-section delivery-time">
        <p>Select Delivery Time:</p>
        <label>
          <input
            type="radio"
            value="11.05"
            checked={deliveryTime === '11.05'}
            onChange={(event) => {
              handleSelectSectionChange(event, setDeliveryTime)
            }}
          />
          11.05
        </label>
        <label>
          <input
            type="radio"
            value="12.20"
            checked={deliveryTime === '12.20'}
            onChange={(event) => {
              handleSelectSectionChange(event, setDeliveryTime)
            }}
          />
          12.20
        </label>
      </div>
    </div>
  );
};

export default Lunch;
