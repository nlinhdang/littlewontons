// import { useAppContext } from './AppContext';
import React, { useState } from 'react';
import payment from './img/payment.png';
import { formatSubmissionTime } from './utils';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { FrozenContext } from './Context/FrozenContext';
import { LunchContext } from './Context/LunchContext';
import { UserContext } from "./Context/Note-userContext";




const OrderForm = ({ productList }) => {
  const frozenSauce = useContextSelector(FrozenContext, ({ frozenSauce }) => frozenSauce);
  const deliveryLocation = useContextSelector(FrozenContext, ({ deliveryLocation }) => deliveryLocation);

  const lunchSauce = useContextSelector(LunchContext, ({ lunchSauce }) => lunchSauce);
  const cutlery = useContextSelector(LunchContext, ({ cutlery }) => cutlery);
  const numWeeks = useContextSelector(LunchContext, ({ numWeeks }) => numWeeks);
  const deliveryTime = useContextSelector(LunchContext, ({ deliveryTime }) => deliveryTime);

  const note = useContextSelector(UserContext, ({ note }) => note);
  const formData = useContextSelector(UserContext, ({ formData }) => formData);
  const setFormData = useContextSelector(UserContext, ({ setFormData }) => setFormData);
  const total = useContextSelector(UserContext, ({ total }) => total);

  
  const [submitText, setSubmitText] = useState('Submit Order')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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
        friBoiledQuantity: product.friBoiledQuantity,
      })),
      deliveryTime,
      frozenSauce,
      lunchSauce,
      deliveryLocation,
      cutlery,
      total,
      note,
      submissionTime: formatSubmissionTime(currentTime),
    };

    setIsSubmitting(true)
    setSubmitText('Loading . . .'); // Hiển thị "Loading" ngay lập tức
    


    //Test khi bấm submit
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // navigate('/success');
    // setIsSubmitting(false); // Kết thúc gửi đơn hàng
    // setSubmitText('Submit Order');
    // console.log(orderData);
    

    // Uncomment to send data to the server
    
    try {
      //const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzE1MjZjNTUzNDUxMzci_pc', { //littelwontons
      
      // await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZjMDYzNDA0MzM1MjY5NTUzNjUxMzYi_pc", { //nlinhdang
      

      await fetch('https://script.google.com/macros/s/AKfycbwHr1Wgm9Y1BWsYenUUWq2rXiulqvfi4KLBMubsCZrz3vqL2-RIiCO0TlwHcWufh8pjlA/exec', {
        
        method: 'POST',
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      // if (response.ok) {
        if (total !== 0) {
          // const data = await response.json();
          navigate('/success');
        } else {
          alert('Oops... It looks like no products were selected. Please check again!');
        } 
        // } else {
        //   console.error('Error sending data to server:', response.statusText);
        //   alert('Order unsuccessful. Please try again or reach me out via WhatsApp 0986289155 to place your order directly');
        // }
      } catch (error) {
        console.error('Error sending data to server:', error);
        alert("Order unsuccessful. Don't worry, just reach me out via WhatsApp 0986289155 to confirm your order"); // Thông báo lỗi
      } finally {
      setIsSubmitting(false); // Kết thúc gửi đơn hàng
      setSubmitText('Submit Order'); // Reset nút về trạng thái ban đầu
    }
    
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
                <label htmlFor="phone">Phone <span style={{ color: 'red' }}>*</span></label>
                <p>We will contact you on WhatsApp when your Wontons have arrived.</p>
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
            <button type="submit" disabled={isSubmitting}>{submitText}</button>
          </div>
          </form>
        </div>
    </>
  );
};

export default OrderForm;
