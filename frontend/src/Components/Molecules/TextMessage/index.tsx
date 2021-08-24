import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

import { useColors } from 'Hooks/colors';

const TextMessage: React.FC = () => {
  const { orange, purple } = useColors();

  const backgroundColor = useColorModeValue('white', 'gray.700');
  const timeColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      p="10px"
      backgroundColor={backgroundColor}
      borderRadius="5px"
      w="100%"
      maxW="300px"
      position="relative"
      alignSelf="flex-start"
    >
      <Text fontWeight="bold" color={purple}>
        User
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        molestias sunt quas explicabo rerum quaerat nihil, quibusdam est sequi,
        commodi incidunt harum enim cum, officia facere quidem! Accusantium,
        nulla atque.
      </Text>
      <Text
        lineHeight="0px"
        fontSize="sm"
        position="absolute"
        bottom="15px"
        right="10px"
        color={timeColor}
      >
        09:56 PM
      </Text>
    </Box>
  );
};

export default TextMessage;
