
import React, { useState } from "react";
import { createContext } from 'use-context-selector';


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [total, setTotal] = useState(0)
  const [note, setNote] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    note: '',
  }); 


  return (
    <UserContext.Provider value={{ note, setNote, formData, setFormData, total, setTotal }}>
      {children}
    </UserContext.Provider>
  );
};