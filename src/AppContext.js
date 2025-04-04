// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [frozenSauce, setFrozenSauce] = useState(null)
  const [lunchSauce, setLunchSauce] = useState([])

  const [cutlery, setCutlery] = useState(null)

  const [deliveryTime, setDeliveryTime] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [numWeeks, setNumWeeks] = useState(1); 
  const [totalCookedAmountWeeks, setTotalCookedAmountWeeks] = useState(null);
  const [totalFrozenAmount, setTotalFrozenAmount] = useState(null)
  const [note, setNote] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    note: '',
  }); 
  
  //Cần fix
  const handleSelectSectionChange = (event, setAction) => {
    const value = event.target.value;
    setAction(prevValue => (prevValue === value ? null : value));
  }


  return (
    <AppContext.Provider value={{handleSelectSectionChange, frozenSauce, setFrozenSauce, lunchSauce, setLunchSauce, cutlery, setCutlery, deliveryLocation, setDeliveryLocation, deliveryTime, setDeliveryTime, numWeeks, setNumWeeks, totalCookedAmountWeeks, setTotalCookedAmountWeeks, totalFrozenAmount, setTotalFrozenAmount, note, setNote, formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
