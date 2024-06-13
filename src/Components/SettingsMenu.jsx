import React, { useContext, useState } from 'react';
import { Container, Text, NumberInput, Switch, Button, TextInput } from '@mantine/core';
import { SettingsContext } from './Context/Settings';

const SettingsMenu = () => {
  const { itemsPerPage, showCompleted, searchString, filterBySearch, setItemsPerPage, setShowCompleted, setSearchString, setFilterBySearch, setUser } = useContext(SettingsContext);
  const [newItemsPerPage, setNewItemsPerPage] = useState(itemsPerPage);
  const [newShowCompleted, setNewShowCompleted] = useState(showCompleted);
  const [newSearchString, setNewSearchString] = useState(searchString);
  const [newFilterBySearch, setNewFilterBySearch] = useState(filterBySearch);

  const saveSettings = () => {
    setItemsPerPage(newItemsPerPage);
    setShowCompleted(newShowCompleted);
    setSearchString(newSearchString);
    setFilterBySearch(newFilterBySearch);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Container style={{ position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)', backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '8px', width: '300px' }}>
      <Text size="lg" weight={500} style={{ marginBottom: '10px' }}>Settings</Text>
      <NumberInput
        label="Items Per Page"
        value={newItemsPerPage}
        onChange={setNewItemsPerPage}
        min={1}
        max={100}
        style={{ marginBottom: '10px' }}
      />
      <Switch
        label="Show Completed"
        checked={newShowCompleted}
        onChange={(event) => setNewShowCompleted(event.currentTarget.checked)}
        style={{ marginBottom: '10px' }}
      />
      <TextInput
        label="Search String"
        value={newSearchString}
        onChange={(event) => setNewSearchString(event.currentTarget.value)}
        placeholder="Enter search string"
        style={{ marginBottom: '10px' }}
      />
      <Switch
        label="Filter by Search"
        checked={newFilterBySearch}
        onChange={(event) => setNewFilterBySearch(event.currentTarget.checked)}
        style={{ marginBottom: '10px' }}
      />
      <Button onClick={saveSettings} style={{ marginBottom: '10px' }}>Save</Button>
      <Button onClick={handleLogout} color="red">Log Out</Button>
    </Container>
  );
};

export default SettingsMenu;
