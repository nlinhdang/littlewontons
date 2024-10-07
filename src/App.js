import logo from './img/logo.png';
import littlewonton from './img/littlewonton.png';
import made from './img/made.png';
import clickme from './img/clickme.png';


import OrderPage from './OrderPage';
import './style.css';
import React, { useState } from 'react';
import { AppProvider } from './AppContext';

const products = [
  {
    name: 'Simply Pork',
    frozenPrice: '50k',
    cookedPrice: '70k',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
  },
  {
    name: 'Juicy Shrimp & Pork',
    frozenPrice: '70k',
    cookedPrice: '90k',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
  },
  {
    name: 'Mix',
    frozenPrice: '60k',
    cookedPrice: '80k',
    frozenQuantity: 0,
    cookedQuantity: 0,
    operation: 'Reset',
    cookedOption: null,
  },
];

function App() {
  const [isClicked, setIsClicked] = useState(false); // Thêm state để theo dõi khi nào người dùng chọn option

  const handleLogoClick = () => {
    setIsClicked(true); // Khi người dùng chọn option, set thành true
  };

  return (
    <AppProvider>
      <div className={`container ${isClicked ? 'clicked' : ''}`}>
        <div className={`img-container ${isClicked ? 'clicked' : 'centered'}`}>

          <div className={`logo-container ${isClicked ? 'logo-block' : ''}`}>
            <img
              src={littlewonton}
              className={`littlewonton ${isClicked ? 'logo-block' : ''}`}
            />
            <img
              src={logo} alt="logo"
              className={`logo ${isClicked ? 'logo-block' : 'shake-animation'}`}
              onClick={handleLogoClick}
            />
            <img src={made}
              className={`madewithlove ${isClicked ? 'logo-block' : ''}`}
            />
            <img
              src={clickme} alt="clickme"
              className={`clickme ${isClicked ? 'logo-block' : ''}`}
            />
          </div>
        </div>
        <div className="product-table">

          {isClicked && <OrderPage products={products} />}


        </div>
      </div>

    </AppProvider>
  );
}

export default App;
