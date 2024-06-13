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

  const [searchString, setSearchString] = useState(() => {
    const saved = localStorage.getItem('searchString');
    return saved ? saved : '';
  });

  const [filterBySearch, setFilterBySearch] = useState(() => {
    const saved = localStorage.getItem('filterBySearch');
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
  }, [showCompleted]);

  useEffect(() => {
    localStorage.setItem('searchString', searchString);
  }, [searchString]);

  useEffect(() => {
    localStorage.setItem('filterBySearch', JSON.stringify(filterBySearch));
  }, [filterBySearch]);

  const value = {
    itemsPerPage,
    showCompleted,
    searchString,
    filterBySearch,
    setItemsPerPage,
    setShowCompleted,
    setSearchString,
    setFilterBySearch,
    user,
    setUser,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
