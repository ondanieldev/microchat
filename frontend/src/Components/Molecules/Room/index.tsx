import React from 'react';
import {
  Avatar,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

import { useColors } from 'Hooks/colors';

const Room: React.FC = () => {
  const { orange, purple } = useColors();
  const hoverBackgroundColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <HStack
      py="10px"
      w="100%"
      alignItems="center"
      px="20px"
      _hover={{
        backgroundColor: hoverBackgroundColor,
      }}
      cursor="pointer"
    >
      <Avatar name="room" backgroundColor={orange} />
      <VStack spacing="5px" alignItems="flex-start">
        <Text lineHeight="20px" fontWeight="bold" maxW="200px" isTruncated>
          room name
        </Text>
        <Text lineHeight="20px" maxW="200px" isTruncated>
          room last message
        </Text>
      </VStack>
    </HStack>
  );
};

export default Room;
