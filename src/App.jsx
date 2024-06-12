// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Container, Box, ActionIcon } from '@mantine/core';
import Header from './Components/Header';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import SettingsMenu from './Components/SettingsMenu';
import SettingsProvider from './Components/Settings';

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <SettingsProvider>
      <Box style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', paddingBottom: '80px', color: '#f5f5f5', position: 'relative' }}>
        <Header />
        <ActionIcon 
          onClick={toggleSettings} 
          size="xl" 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px',
            background: 'none', 
            border: 'none', 
            padding: '0'
          }}
        >
          <img src="/gear.png" alt="Settings" style={{ width: '32px', height: '32px' }} />
        </ActionIcon>
        {settingsOpen && <SettingsMenu />}
        <Container style={{ paddingBottom: '80px', paddingTop: '20px' }}>
          <Todo />
        </Container>
        <Footer />
      </Box>
    </SettingsProvider>
  );
}
