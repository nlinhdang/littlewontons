import React, { useState, useEffect } from 'react';

import banner from "./img/Banner.jpg"
import OrderButton from './OrderButton';

const PopupBanner = ({activeLink, setActiveLink}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Luôn hiện sau 1 giây

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={() => setIsVisible(false)}>
          ✕
        </button>
        <img
          src={banner}
          alt="Update announcement"
          className="popup-image"
        />
        <OrderButton activeLink={activeLink} setActiveLink={setActiveLink} setIsVisible={setIsVisible}/>
      </div>
    </div>
  );
};

export default PopupBanner;
