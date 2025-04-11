// LunchContext.js
import React, { useState } from "react";
import { createContext } from 'use-context-selector';


export const LunchContext = createContext(null);


export const LunchProvider = ({ children }) => {
  const [lunchSauce, setLunchSauce] = useState([]);
  const [cutlery, setCutlery] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [numWeeks, setNumWeeks] = useState(1); 
  const [totalCookedAmountWeeks, setTotalCookedAmountWeeks] = useState(0);
  
  return (
    <LunchContext.Provider value={{ lunchSauce, setLunchSauce, cutlery, setCutlery, deliveryTime, setDeliveryTime, numWeeks, setNumWeeks, totalCookedAmountWeeks, setTotalCookedAmountWeeks }}>
      {children}
    </LunchContext.Provider>
  );
};
