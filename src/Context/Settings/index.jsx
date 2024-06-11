import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    itemsPerPage: 3,
    hideCompleted: true,
    sortWord: 'difficulty',
  });

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
