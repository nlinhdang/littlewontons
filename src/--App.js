import logo from './img/logo.png';
import ProductTable from './ProductTable';
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
  const [isOptionSelected, setIsOptionSelected] = useState(false); // Thêm state để theo dõi khi nào người dùng chọn option

  const handleOptionChange = () => {
    setIsOptionSelected(true); // Khi người dùng chọn option, set thành true
  };

  return (
    <AppProvider>
      <div className={`app-container ${isOptionSelected ? '' : 'centered'}`}> 
        {/* Thay đổi class khi người dùng đã chọn */}
        <img src={logo} alt="logo" style={{ height: '200px' }}
        className={`${isOptionSelected ? 'logo-block' : ''}`}/>
        <ProductTable products={products} onOptionChange={handleOptionChange} />
      </div>
    </AppProvider>
  );
}

export default App;
