import React, { useMemo, useCallback } from 'react';
import {
  Avatar,
  Button,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

import IRoom from 'Types/Entities/IRoom';
import { useColors } from 'Hooks/colors';

import { useAuth } from 'Hooks/auth';

import { useRooms } from 'Hooks/rooms';

interface IProps {
  data: IRoom;
  isUserRoom?: boolean;
}

const Room: React.FC<IProps> = ({ data, isUserRoom }) => {
  const { user } = useAuth();
  const { setCurrentRoom } = useRooms();
  const { orange, purple } = useColors();
  const hoverBackgroundColor = useColorModeValue('gray.200', 'gray.600');

  const avatarColor = useMemo(
    () =>
      data.last_message && data.last_message.user_id === user?.id
        ? orange
        : purple,
    [user, data, orange, purple],
  );

  const handleSelectRoom = useCallback(() => {
    if (!isUserRoom) {
      return;
    }
    setCurrentRoom(data);
  }, [setCurrentRoom, data, isUserRoom]);

  const cursor = useMemo(
    () => (isUserRoom ? 'pointer' : 'inherit'),
    [isUserRoom],
  );
  const hover = useMemo(
    () => (isUserRoom ? { backgroundColor: hoverBackgroundColor } : {}),
    [isUserRoom, hoverBackgroundColor],
  );
  const px = useMemo(() => (isUserRoom ? '20px' : '0px'), [isUserRoom]);

  return (
    <HStack
      py="10px"
      w="100%"
      alignItems="center"
      px={px}
      _hover={hover}
      cursor={cursor}
      onClick={handleSelectRoom}
    >
      <Avatar name={data.name} backgroundColor={avatarColor} />
      <VStack spacing="5px" alignItems="flex-start" flex="1">
        <Text lineHeight="20px" fontWeight="bold" maxW="200px" isTruncated>
          {data.name}
        </Text>
        {data.last_message && (
          <Text lineHeight="20px" maxW="200px" isTruncated>
            {data.last_message.content}
          </Text>
        )}
      </VStack>
      {!isUserRoom && <Button colorScheme="purple">join</Button>}
    </HStack>
  );
};

export default Room;
