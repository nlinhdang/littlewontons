import { useAppContext } from './AppContext';
import React, { useState } from 'react';
import payment from './img/payment.png';
import { formatNumber } from './utils';

const OrderForm = ({ totalAmount, productList }) => {

  const [note, setNote] = useState(null)
  const { numWeeks, deliveryTime, deliveryLocation } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNote = (e) => {
    const value = e.target.value;
    setNote(value);
    setFormData(prev => ({
      ...prev,
      note: value // Cập nhật vào formData
    }));
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const orderData = {
        ...formData,
        numWeeks,
        products: productList.map(product => ({
          name: product.name,
          frozenQuantity: product.frozenQuantity,
          monBoiledQuantity: product.monBoiledQuantity,
          wedBoiledQuantity: product.wedBoiledQuantity,
          friedQuantity: product.friedQuantity
        })),
        deliveryTime,
        deliveryLocation,
        totalAmount,
        note
      };
    //   try {
    //     const response = await fetch('https://littlewontons-hcqzmdxsk-linhs-projects-fe6ae416.vercel.app/submit-order', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(orderData),
    //     });

    //     const data = await response.json();
    //     console.log('Response from server:', data); // Ghi ra phản hồi từ server
    //   } catch (error) {
    //     console.error('Error sending data to server:', error);
    //   }
     };

    return (
      <>
        <div className='note'>Note:
          <input type="text"
            placeholder='Type here'
            id="note"
            name="note"
            value={formData.note}
            onChange={handleNote}
          />
        </div>
        <div className="container payment-form">
          <div className='order-form'>
            <h1>Order Form</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
          
            </form>
          </div>

          <div className="payment">
            <h3>Your total bill: {formatNumber(totalAmount)}</h3>
            <div className='bank-info'>
              <div>
                <h4>Transfer to:</h4>
                <p>DANG THI NGOC LINH</p>
                <p>104871546592</p>
                <p>VietinBank</p>
              </div>
              <img src={payment} alt='payment' className='payment-photo' />
            </div>
          </div>
        </div>
        
        <div className="submit-button">
          <button type="submit">Submit Order</button>
        </div>
      </>
    
    );
  }
;

export default OrderForm;
