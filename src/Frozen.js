import React, { useEffect } from 'react';
import { formatNumber, calculateAmount } from './utils';
import { useAppContext } from './AppContext';
import Announcement from './Announcement';
// import Promotion from './Promotion';

const frozenHeaders = ['Product', '10 pieces', 'Pieces', 'Amount', 'Operation'];


const Frozen = ({ productList, onQuantityChange, onQuantityUpdate, onFocus, onClearAll }) => {

  const { deliveryLocation, setDeliveryLocation, setTotalFrozenAmount } = useAppContext();

  const handleDeliveryLocationChange = (event) => {
    setDeliveryLocation(event.target.value);
  };

  const totalFrozenAmount = productList.reduce((sum, product) => sum + calculateAmount(product.frozenPrice, product.frozenQuantity, 100), 0);

  // Sử dụng useEffect để cập nhật giá trị totalFrozenAmount vào App Context
  useEffect(() => {
    setTotalFrozenAmount(totalFrozenAmount);
  }, [totalFrozenAmount, setTotalFrozenAmount]);

  const promotion = {
    month: 9,
    day: 16,
    message: `<div class="promotion-container">
      <p>
        Special FROZEN offer: <span style="font-size: 1.1rem;">10%</span> extra for existing customers 
      </p>
      <p>from 1/10 to 16/10</p>
    </div>`

  }
  return (
    <div className="container">
      <h1>Frozen wontons</h1>
      <Announcement month={promotion.month} day={promotion.day} message={promotion.message} className="promotion" />
      <div className="grid-container frozen">
        {frozenHeaders.map((header, index) => (
          <div className={`grid-header header${index}`} key={index}>{header}</div>
        ))}

        {productList.map((product, index) => (
          <React.Fragment key={index}>
            <div className="grid-item product-name">{product.name}</div>
            <div className="grid-item">{product.frozenPrice}</div>
            <div className="grid-item quantity-control">
              <button className="quantity-button quantity-button-decrease" onClick={() => onQuantityUpdate(index, -10, 'frozenQuantity')}>-</button>
              <input
                type="number"
                min="0"
                step="10"
                value={product.frozenQuantity || ''}
                onChange={(e) => onQuantityChange(index, e.target.value, 'frozenQuantity')}
                onFocus={() => onFocus(index, 'frozenQuantity')}
                placeholder="0"
                className="quantity-input"
              />
              <button className="quantity-button quantity-button-increase" onClick={() => onQuantityUpdate(index, 10, 'frozenQuantity')}>+</button>
            </div>
            <div className="grid-item amount">
              {formatNumber(calculateAmount(product.frozenPrice, product.frozenQuantity, 100))}
            </div>
            <button className="grid-item reset-button" onClick={() => onFocus(index, 'frozenQuantity')}>
              {product.operation}
            </button>
          </React.Fragment>
        ))}
        <button className="clear-all-button"
          onClick={() => onClearAll(['frozenQuantity'])}>
          Clear all</button>
      </div>


      <div className="total">Frozen bill: {formatNumber(totalFrozenAmount)}</div>

      {/* Delivery Location Section */}
      <div className="delivery-section delivery-location">
        <p>Select Delivery Location:</p>
        <label>
          <input
            type="radio"
            value="ES"
            checked={deliveryLocation === 'ES'}
            onChange={handleDeliveryLocationChange}
          />
          ES Staff Lounge freezer
        </label>
        <label>
          <input
            type="radio"
            value="MS"
            checked={deliveryLocation === 'MS'}
            onChange={handleDeliveryLocationChange}
          />
          MS Staff Lounge freezer
        </label>
        <label>
          <input
            type="radio"
            value="HS"
            checked={deliveryLocation === 'HS'}
            onChange={handleDeliveryLocationChange}
          />
          HS Staff Lounge freezer
        </label>
      </div>
    </div>
  );
};

export default Frozen;
