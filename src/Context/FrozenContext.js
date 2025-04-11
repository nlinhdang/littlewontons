// FrozenContext.js
import React, { useState } from "react";
import { createContext } from 'use-context-selector';

export const FrozenContext = createContext(null);

export const FrozenProvider = ({ children }) => {
  const [frozenSauce, setFrozenSauce] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const [totalFrozenAmount, setTotalFrozenAmount] = useState(null);

  return (
    <FrozenContext.Provider value={{ frozenSauce, setFrozenSauce,  deliveryLocation, setDeliveryLocation, totalFrozenAmount, setTotalFrozenAmount }}>
      {children}
    </FrozenContext.Provider>
  );
};