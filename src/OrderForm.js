import { useAppContext } from './AppContext';
import React, { useState } from 'react';
import payment from './img/payment.png';
import { formatSubmissionTime } from './utils';

const OrderForm = ({ totalAmount, productList }) => {
  const { numWeeks, deliveryTime, deliveryLocation, note, formData, setFormData } = useAppContext();

  const [submit, setSubmit] = useState('Submit Order')
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date().toISOString(); 
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
      submissionTime: formatSubmissionTime(currentTime),
    };

    setSubmit('Loading. . .'); // Hiển thị "Loading" ngay lập tức


    await new Promise(resolve => setTimeout(resolve, 5000));


        console.log('Order Data to send:', orderData);
        window.location.href = 'success.html';


    // Uncomment to send data to the server
    
    // try {
    //   const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzE1MjZjNTUzNDUxMzci_pc', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(orderData),
    //   });

    //   if (response.ok) { // Kiểm tra xem phản hồi có thành công không
    //     if (totalAmount !== 0) {
    //       const data = await response.json();
    //       console.log('Order Data to send:', orderData);
    //       console.log('Response from server:', data);
    //       window.location.href = 'success.html';
    //     } else {
    //       alert('Oops... It looks like no products were selected. Please check again!');
    //     } 
    //     } else {
    //       console.error('Error sending data to server:', response.statusText);
    //       alert('Order unsuccessful. Please try again or reach me out via WhatsApp 0986289155 to place your order directly'); // Thông báo lỗi
    //     }
    //   } catch (error) {
    //     console.error('Error sending data to server:', error);
    //     alert('Order unsuccessful. Please try again or reach me out via WhatsApp 0986289155 to place your order directly'); // Thông báo lỗi
    //   }
    
  }

  return (
    <>
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
            <button type="submit">{submit}</button>
          </div>
          </form>
        </div>
    </>
  );
};

export default OrderForm;
