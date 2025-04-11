import logo from './img/logo.png';
import littlewonton from './img/littlewonton.png';
import made from './img/made.png';
import clickme from './img/clickme.png';


import OrderPage from './OrderPage';
import { FrozenProvider } from './Context/FrozenContext';
import { UserProvider } from "./Context/Note-userContext";
import { LunchProvider } from './Context/LunchContext';

import './style.css';
import React, { useState } from 'react';
import Announcement from './Announcement';



const announcement = {
  year: 2024,
  month: 9,
  day: 20,
  message: "Orders placed from Friday 11/9 to Sunday 20/9 will be delivered starting from Monday 21/9. Happy holiday!!! 🎉"
}

const Home = () => {
   const [isClicked, setIsClicked] = useState(false); // Thêm state để theo dõi khi nào người dùng chọn option

  const handleLogoClick = () => {
    setIsClicked(true); // Khi người dùng chọn option, set thành true
  };
  return (  
    <>
      <div className={`container ${isClicked ? 'clicked' : ''}`}>

        <div className={`img-container ${isClicked ? 'clicked' : 'centered'}`}>

          <div className={`logo-container ${isClicked ? 'logo-block' : ''}`}>
            <img
              src={littlewonton} alt="littlewonton"
              className={`littlewonton ${isClicked ? 'logo-block' : ''}`}
            />
            <img
              src={logo} alt="logo"
              className={`logo ${isClicked ? 'logo-block' : 'shake-animation'}`}
              onClick={handleLogoClick}
            />
            <img src={made} alt="made"
              className={`madewithlove ${isClicked ? 'logo-block' : ''}`}
            />
            <img
              src={clickme} alt="clickme"
              className={`clickme ${isClicked ? 'logo-block' : ''}`}
            />

            {isClicked || <Announcement month={announcement.month} day={announcement.day} year={announcement.year} message={announcement.message}
            className="announcement"/>}
          </div>
        </div>
          
        <div className="product-table">
          {isClicked &&
            <UserProvider>
              <FrozenProvider>
                <LunchProvider>
                  <OrderPage/>
                </LunchProvider>
              </FrozenProvider>
            </UserProvider>
            }
        </div>

      </div>
    </>
  );
}
 
export default Home;