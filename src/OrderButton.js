import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderButton({ activeLink, setActiveLink }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setActiveLink('order');
    navigate('/order');
    window.scrollTo(0, 0);
    
  };

  if (location.pathname === '/order') {
    return null; // Không hiển thị nút
  }
  
  return (
    <button className={activeLink === 'order' ? 'active' : ''} onClick={handleClick}>
      Order
    </button>
  );
}

export default OrderButton;