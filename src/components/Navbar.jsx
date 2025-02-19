// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, Flex, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';

// function Navbar() {
//   const { toggleColorMode } = useColorMode();
//   const bg = useColorModeValue('gray.400', 'gray.900');
//   const color = useColorModeValue('black', 'white');

//   return (
//     <Box bg={bg} px={4}>
//       <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//         <Link to="/"><Button variant="ghost">Home</Button></Link>
//         <Flex alignItems={'center'}>
          
//           <Link to="/editor"><Button variant="ghost">Text Editor</Button></Link>
//           <Link to="/form"><Button variant="ghost">User Data</Button></Link>
//           <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
//           <Button onClick={toggleColorMode} ml={4}>
//             Toggle {useColorModeValue('Dark', 'Light')}
//           </Button>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// }

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function Navbar() {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.400', 'gray.900');
  const color = useColorModeValue('black', 'white');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Link to="/">
          <Button variant="ghost">Home</Button>
        </Link>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: 'block', md: 'none' }}
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          onClick={toggleDrawer}
        />

        {/* Desktop Navigation */}
        <Flex display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
          <Link to="/editor">
            <Button variant="ghost">Text Editor</Button>
          </Link>
          <Link to="/form">
            <Button variant="ghost">User Data</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Button onClick={toggleColorMode} ml={4}>
            Toggle {useColorModeValue('Dark', 'Light')}
          </Button>
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent bg={bg} color={color}>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} mt={8} align="stretch">
              
              <Link to="/editor" onClick={toggleDrawer}>
                <Button variant="ghost">Text Editor</Button>
              </Link>
              <Link to="/form" onClick={toggleDrawer}>
                <Button variant="ghost">User Data</Button>
              </Link>
              <Link to="/dashboard" onClick={toggleDrawer}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button onClick={toggleColorMode} variant="outline">
                Toggle {useColorModeValue('Dark', 'Light')}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
