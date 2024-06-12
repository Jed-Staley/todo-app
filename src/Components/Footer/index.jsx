// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Text, Center } from '@mantine/core';

const AppFooter = () => {
  return (
    <Box style={{ backgroundColor: '#333', padding: '20px 0', position: 'fixed', bottom: 0, width: '100%' }}>
      <Center>
        <Text style={{ color: '#fff' }}>&copy; Jedidiah Staley 2024</Text>
      </Center>
    </Box>
  );
}

export default AppFooter;
