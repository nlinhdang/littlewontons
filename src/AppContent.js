import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import SuccessPage from './SuccessPage';
import Homepage from './Homepage';
import HowToCook from './HowToCook';
import OrderPage from './OrderPage';
import Header from './Header';
import PopupBanner from './PopupBanner';

function AppContent() {
  const location = useLocation();
  const productRef = useRef();
  const homeRef = useRef();
  const [activeLink, setActiveLink] = useState('home');

  const scrollToProduct = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHomepage = () => {
    homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const productPosition = productRef.current?.getBoundingClientRect();
        const homePosition = homeRef.current?.getBoundingClientRect();

        if (productPosition && productPosition.top < window.innerHeight && productPosition.bottom > 0) {
          setActiveLink('product');
        } else if (homePosition && homePosition.top < window.innerHeight && homePosition.bottom > 0) {
          setActiveLink('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveLink('home');
    } else if (location.pathname === '/order') {
      setActiveLink('order');
    } else if (location.pathname === '/how-to-cook') {
      setActiveLink('how-to-cook');
    } else {
      setActiveLink('');
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/success' && (
        <Header
          scrollToProduct={scrollToProduct}
          scrollToHomepage={scrollToHomepage}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              productRef={productRef}
              homeRef={homeRef}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          }
        />
        <Route path="/order" element={<OrderPage />} />
        <Route
          path="/how-to-cook"
          element={
            <HowToCook activeLink={activeLink} setActiveLink={setActiveLink} />
          }
        />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <PopupBanner activeLink={activeLink} setActiveLink={setActiveLink} />
    </>
  );
}

export default AppContent;
