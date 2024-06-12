// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { Container, Text, NumberInput, Switch, Button } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';

const SettingsMenu = () => {
  const { itemsPerPage, showCompleted, setItemsPerPage, setShowCompleted } = useContext(SettingsContext);
  const [newItemsPerPage, setNewItemsPerPage] = useState(itemsPerPage);
  const [newShowCompleted, setNewShowCompleted] = useState(showCompleted);

  const saveSettings = () => {
    setItemsPerPage(newItemsPerPage);
    setShowCompleted(newShowCompleted);
  };

  return (
    <Container style={{ position: 'fixed', top: '20%', right: '20px', transform: 'translateY(-50%)', backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '8px', width: '300px' }}>
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
      <Button onClick={saveSettings}>Save</Button>
    </Container>
  );
};

export default SettingsMenu;
