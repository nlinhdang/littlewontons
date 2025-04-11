import { useLocation, useNavigate } from "react-router-dom";
import logo from './img/little wontons logo.png'
import OrderButton from "./OrderButton";
import { useEffect, useState } from "react";

function Header({ scrollToHomepage, scrollToProduct, activeLink, setActiveLink }) {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname; 

  const handleHomepageClick = () => {
    setActiveLink('home');
    navigate('/');

    if (currentPath === '/') {
      scrollToHomepage(); // Nếu đang ở trang chính, cuộn đến phần chính
    } else { // Nếu đang ở các trang khác
      navigate('/'); // Điều hướng đến trang chính
      window.scrollTo(0, 0); // nhảy lên đầu trang
    }
  };

  const handleProductClick = () => {
    setActiveLink('product');
    navigate('/');
    setTimeout(scrollToProduct, 0);
  };

  const handleHowToCookClick = () => {
    setActiveLink('how-to-cook');
    navigate('/how-to-cook');
    window.scrollTo(0, 0);
  }
  
  return (  
    <header className='header-wrapper'>
        <div className='header'>
          <logo>
            <img src={logo} alt="nav logo" className='nav-logo' onClick={handleHomepageClick}/>
          </logo>
          <nav>
            <OrderButton 
            activeLink={activeLink} 
            setActiveLink={setActiveLink} 
          />
            <div className={activeLink === 'home' ? 'active' : ''} onClick={handleHomepageClick}>Homepage</div>
            <div className={activeLink === 'product' ? 'active' : ''} onClick={handleProductClick}>Product</div>
            <div className={activeLink === 'how-to-cook' ? 'active' : ''} onClick={handleHowToCookClick}>How to cook</div>
          </nav>
        </div>
      </header>
  );
}
 
export default Header;