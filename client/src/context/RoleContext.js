// RoleContext.js
import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const storedRole = localStorage.getItem('selectedRole');
  const [role, setRole] = useState(storedRole ? JSON.parse(storedRole) : '');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
