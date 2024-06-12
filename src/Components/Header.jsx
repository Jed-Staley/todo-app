// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Title, Box, Center } from '@mantine/core';

const Header = () => {
  return (
    <Box style={{ backgroundColor: '#333', padding: '20px 0', width: '100%' }}>
      <Center>
        <Title order={1} style={{ color: '#fff' }}>Context API</Title>
      </Center>
    </Box>
  );
}

export default Header;
