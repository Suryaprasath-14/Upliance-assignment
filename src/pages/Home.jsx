import React from 'react';
import { Box, Text, Heading, Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Heading as="h1" mb={4}>
        Welcome to Upliance.ai
      </Heading>
      <Text fontSize="xl" mb={4}>
        Explore the features(functional requirements) and let me know if it's upto your expectations :).
      </Text>
      <Text fontSize="xl" mb={4}>
        I did not implement User Authentication as it was optional, but have implemented the dashboard feature. I hope it holds no impact on my candidature! :)
      </Text>
     
    </Box>
  );
}

export default Home;