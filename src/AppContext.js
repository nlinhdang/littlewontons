// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null); // Default value
  // const [note, setNote] = useState(null)
  const [numWeeks, setNumWeeks] = useState(1); 
  const [totalCookedAmountWeeks, setTotalCookedAmountWeeks] = useState(0);

  return (
    <AppContext.Provider value={{deliveryLocation, setDeliveryLocation, deliveryTime, setDeliveryTime, numWeeks, setNumWeeks, totalCookedAmountWeeks, setTotalCookedAmountWeeks }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
