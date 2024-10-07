// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null); // Default value
  // const [note, setNote] = useState(null)
  const [numWeeks, setNumWeeks] = useState(1); 
  const [totalCookedAmountWeeks, setTotalCookedAmountWeeks] = useState(null);
  const [totalFrozenAmount, setTotalFrozenAmount] = useState(null)
  const [note, setNote] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    note: '',
  });

  return (
    <AppContext.Provider value={{deliveryLocation, setDeliveryLocation, deliveryTime, setDeliveryTime, numWeeks, setNumWeeks, totalCookedAmountWeeks, setTotalCookedAmountWeeks, totalFrozenAmount, setTotalFrozenAmount, note, setNote, formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
