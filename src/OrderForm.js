import { useAppContext } from './AppContext';
import React, { useState } from 'react';
import payment from './img/payment.png';
import { formatNumber } from './utils';

const OrderForm = ({ totalAmount, productList }) => {
  const [note, setNote] = useState('');
  const { numWeeks, deliveryTime, deliveryLocation } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    note: '', // Thêm note vào formData
  });

  // const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        friedQuantity: product.friedQuantity,
      })),
      deliveryTime,
      deliveryLocation,
      totalAmount,
      note,
    };

    // Uncomment to send data to the server
    
    try {
      const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzE1MjZjNTUzNDUxMzci_pc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) { // Kiểm tra xem phản hồi có thành công không
        if (totalAmount !== 0) {
          const data = await response.json();
          console.log('Order Data to send:', orderData);
          console.log('Response from server:', data);
          alert('Successfully order'); // Cập nhật thông báo thành công
          // setFormData({ name: '', phone: '', note: '' });
          // Reset form nếu cần
        } else {
          alert('Oops... It looks like no products were selected. Please check again!');
        } 
        } else {
          console.error('Error sending data to server:', response.statusText);
          alert('Order unsuccessful. Please try again or reach me out via WhatsApp 0986289155 to place your order directly'); // Thông báo lỗi
        }
      } catch (error) {
        console.error('Error sending data to server:', error);
        alert('Order unsuccessful. Please try again or reach me out via WhatsApp 0986289155 to place your order directly'); // Thông báo lỗi
      }
    
  }

  function handleNote(e, textarea) {
    textarea.style.height = 'auto'; // Đặt chiều cao về auto để đo chiều cao mới
    textarea.style.height = textarea.scrollHeight + 'px'; // Thiết lập chiều cao mới dựa trên nội dung
    const value = e.target.value;
    setNote(value);
    setFormData(prev => ({
      ...prev,
      note: value, // Cập nhật vào formData
    }));
  }

  return (
    <>
      <div className='note-container'>
        <textarea
          id="note"
          className="note-input"
          rows="2"
          placeholder='If you have any suggestions please let the Little Wontons know!'
          name="note"
          value={formData.note}
          onInput={(e) => handleNote(e, e.target)}
        />
      </div>

      <div className="container payment-form required">
          <form onSubmit={handleSubmit} className='order-form'>

            <div className="order-details">
              <div className='contact-info'>
                <h1>Contact Info</h1>
                <div className='name'>
                <label htmlFor="name">Name <span style={{color:'red'}}>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='phone'>
                <label htmlFor="phone">Phone <span style={{color:'red'}}>*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>

              <div className="payment-info">
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
          </form>
        </div>
    </>
  );
};

export default OrderForm;
