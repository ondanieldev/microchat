import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

const HomeTitle: React.FC = () => {
  return (
    <Heading as="h1">
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="sm">micro</Text>
        CHAT
      </Flex>
    </Heading>
  );
};

export default HomeTitle;
