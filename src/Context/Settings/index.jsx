// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [showCompleted, setShowCompleted] = useState(true);

  const value = {
    itemsPerPage,
    showCompleted,
    setItemsPerPage,
    setShowCompleted,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
