import React, { useMemo } from 'react';
import {
  Avatar,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

import IRoom from 'Types/Entities/IRoom';
import { useColors } from 'Hooks/colors';

import { useAuth } from 'Hooks/auth';

interface IProps {
  data: IRoom;
}

const Room: React.FC<IProps> = ({ data }) => {
  const { user } = useAuth();
  const { orange, purple } = useColors();
  const hoverBackgroundColor = useColorModeValue('gray.200', 'gray.600');

  const avatarColor = useMemo(
    () =>
      data.last_message && data.last_message.user_id === user?.id
        ? orange
        : purple,
    [user, data, orange, purple],
  );

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
      <Avatar name={data.name} backgroundColor={avatarColor} />
      <VStack spacing="5px" alignItems="flex-start">
        <Text lineHeight="20px" fontWeight="bold" maxW="200px" isTruncated>
          {data.name}
        </Text>
        {data.last_message && (
          <Text lineHeight="20px" maxW="200px" isTruncated>
            {data.last_message.content}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default Room;
