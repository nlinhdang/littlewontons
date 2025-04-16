import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderButton({ activeLink, setActiveLink, setIsVisible }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (setIsVisible) setIsVisible(false);
    setActiveLink('order');
    navigate('/order');
    window.scrollTo(0, 0);
    
  };

  if (location.pathname === '/order') {
    return null; // Không hiển thị nút
  }
  
  return (
    <button className={`order-button ${activeLink === 'order' ? 'active' : ''}`} onClick={handleClick}>
      Order
    </button>
  );
}

export default OrderButton;