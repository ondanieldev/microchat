import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

import { useColors } from 'Hooks/colors';

const InfoMessage: React.FC = () => {
  const { orange, purple } = useColors();

  const backgroundColor = useColorModeValue('white', 'gray.700');
  const timeColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      p="10px"
      backgroundColor={backgroundColor}
      borderRadius="5px"
      w="100%"
      maxW="500px"
      alignSelf="center"
    >
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores m
      </Text>
      <Text
        mt="10px"
        lineHeight="0px"
        mb="5px"
        textAlign="center"
        fontSize="sm"
        color={timeColor}
      >
        09:56 PM
      </Text>
    </Box>
  );
};

export default InfoMessage;
