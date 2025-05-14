import React, { useEffect, useState } from 'react';
import { formatNumber, calculateAmount, handleSelectSectionChange } from './utils';
import { useContextSelector } from 'use-context-selector';
import { FrozenContext } from './Context/FrozenContext';
import Announcement from './Announcement';
import plus from './icons/plus.svg'
import minus from './icons/minus.svg'

// import Promotion from './Promotion';

const frozenHeaders = ['Product', '10 pieces', 'Pieces', 'Amount', 'Operation'];

const FrozenComponent = ({ frozenProductList, onQuantityChange, onQuantityUpdate, onFocus, onClearAll }) => {

  const frozenSauce = useContextSelector(FrozenContext, (context) => context.frozenSauce);
  const setFrozenSauce = useContextSelector(FrozenContext, (context) => context.setFrozenSauce);

  const deliveryLocation = useContextSelector(FrozenContext, (context) => context.deliveryLocation);
  const setDeliveryLocation = useContextSelector(FrozenContext, (context) => context.setDeliveryLocation);
  const setTotalFrozenAmount = useContextSelector(FrozenContext, (context) => context.setTotalFrozenAmount);

  const [showProduct, setShowProduct] = useState(false)

  const totalFrozenAmount = frozenProductList.reduce((sum, product) => sum + calculateAmount(product.frozenPrice, product.frozenQuantity, 100), 0);
  // Sử dụng useEffect để cập nhật giá trị totalFrozenAmount vào App Context
  useEffect(() => {
    setTotalFrozenAmount(totalFrozenAmount);
  }, [totalFrozenAmount, setTotalFrozenAmount]);

  
  const promotion = {
    month: 9,
    day: 16,
    message: `<div class="annoucement-container">
      <p>
        Special FROZEN offer: <span style="font-size: 1.1rem;">10%</span> extra for existing customers 
      </p>
      <p>from 1/10 to 16/10</p>
    </div>`

  }

  const frozenAnnouncement = {
    year: 2025,
    month: 3, //current month - 1
    day: 23,
    message: `<div class="annoucement-container">
      <p>
       

        FROZEN orders from now
        <span style="font-size: 1rem;">16/03</span>

        to Sunday
        <span style="font-size: 1rem;">23/03</span>
        will be delivered to <strong>ES/MS/HS freezer</strong> of your choice on Monday <span style="font-size: 1rem;">24/03</span>. Thank you.
      </p>
    </div>`
  }

  

  return (
    <content className="frozen-section">

    {/* Product Table Section */}
      
      <section
        className="product-title"
        onClick={() => setShowProduct(!showProduct)}
      >
        <h1>Frozen wontons</h1>
        <img src={showProduct? minus : plus} alt="minus/plus icon" />
      </section>

      <section
        className={`frozen-order ${showProduct ? '' : 'no-show'}`}>
        <Announcement year={frozenAnnouncement.year} month={frozenAnnouncement.month} day={frozenAnnouncement.day} message={frozenAnnouncement.message} className="promotion" />

        <div className="note frozen-note">
          Place your FROZEN orders by <span>Friday</span>, and we'll have them delivered to you on <span>Monday</span> - every week!
        </div>
        
        
        <div className="grid-container frozen">
          {frozenHeaders.map((header, index) => (
            <div className={`grid-header header${index}`} key={index}>{header}</div>
          ))}

          {frozenProductList.map((product, index) => (
            <React.Fragment key={index}>
              <div className="grid-item product-name">{product.name}</div>
              <div className="grid-item">{product.frozenPrice}</div>
              <div className="grid-item quantity-control">
                <button className="quantity-button quantity-button-decrease" onClick={() => onQuantityUpdate(product.name, -10, 'frozenQuantity')}>-</button>
                <input
                  type="number"
                  // min={product.name === 'Simple Shrimp' ? 20 : 10}
                  min="0"

                  step="10"
                  value={product.frozenQuantity || ''}
                  onChange={(e) => onQuantityChange(product.name, e.target.value, 'frozenQuantity')}
                  onFocus={() => onFocus(product.name, 'frozenQuantity')}
                  placeholder="0"
                  className="quantity-input"
                />
                <button className="quantity-button quantity-button-increase" onClick={() => onQuantityUpdate(product.name, 10, 'frozenQuantity')}>+</button>
              </div>
              <div className="grid-item amount">
                {formatNumber(calculateAmount(product.frozenPrice, product.frozenQuantity, 100))}
              </div>
              <button className="grid-item reset-button" onClick={() => onFocus(product.name, 'frozenQuantity')}>
                {product.operation}
              </button>
            </React.Fragment>
          ))}
          <button className="clear-all-button"
            onClick={() => onClearAll(['frozenQuantity'])}>
            Clear all</button>
        </div>

      {/* Total*/}
        <div className="total">Frozen bill: {formatNumber(totalFrozenAmount)}</div>

      {/* Choose sauce */}
        <div className="select-section sauce-section">
          <p>Little Wontons like to be dipped in sauce. Choose one!</p>
          <label>
            <input
              type="radio"
              value="chili-oil"
              checked={frozenSauce === 'chili-oil'}
              onChange={(event) => {
                handleSelectSectionChange(event, setFrozenSauce)
              }}
            /> Chili oil
          </label>
          <label>
            <input
              type="radio"
              value="soy-sauce"
              checked={frozenSauce === 'soy-sauce'}
              onChange={(event) => {
                handleSelectSectionChange(event, setFrozenSauce)
              }}
            /> Soy sauce
          </label>
          <label>
            <input
              type="radio"
              value="sweet-chili"
              checked={frozenSauce === 'sweet-chili'}
              onChange={(event) => {
                handleSelectSectionChange(event, setFrozenSauce)
              }}
            /> Sweet Chili
          </label>
          <label>
            <input
              type="radio"
              value='no'
              checked={frozenSauce === 'no'}
              onChange={(event) => {
                handleSelectSectionChange(event, setFrozenSauce)
              }}
            /> Or not.
          </label>
        </div>
      
      {/* Delivery Location Section */}
        <div className="select-section delivery-location">
          <p>Select Delivery Location:</p>
          <label>
            <input
              type="radio"
              value="ES"
              checked={deliveryLocation === 'ES'}
              onChange={(event) => {
                handleSelectSectionChange(event, setDeliveryLocation)
              }}
            />
            ES Staff Lounge freezer
          </label>
          <label>
            <input
              type="radio"
              value="MS"
              checked={deliveryLocation === 'MS'}
              onChange={(event) => {
                handleSelectSectionChange(event, setDeliveryLocation)
              }}
            />
            MS Staff Lounge freezer
          </label>
          <label>
            <input
              type="radio"
              value="HS"
              checked={deliveryLocation === 'HS'}
              onChange={(event) => {
                handleSelectSectionChange(event, setDeliveryLocation)
              }}
            />
            HS Staff Lounge freezer
          </label>
        </div>
      </section>
    </content>
  );
};

const Frozen = React.memo(FrozenComponent);
export default Frozen;
