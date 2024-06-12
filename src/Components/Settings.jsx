// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem('itemsPerPage');
    return saved ? JSON.parse(saved) : 3;
  });

  const [showCompleted, setShowCompleted] = useState(() => {
    const saved = localStorage.getItem('showCompleted');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
  }, [showCompleted]);

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
