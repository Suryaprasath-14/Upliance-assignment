import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';

function Navbar() {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.400', 'gray.900');
  const color = useColorModeValue('black', 'white');

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {/* <Box>MyApp</Box> */}
        <Link to="/"><Button variant="ghost">Home</Button></Link>
        <Flex alignItems={'center'}>
          
          <Link to="/editor"><Button variant="ghost">Text Editor</Button></Link>
          <Link to="/form"><Button variant="ghost">User Data</Button></Link>
          <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
          <Button onClick={toggleColorMode} ml={4}>
            Toggle {useColorModeValue('Dark', 'Light')}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;