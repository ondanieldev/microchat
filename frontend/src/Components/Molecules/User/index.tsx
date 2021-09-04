import React, { useCallback, useState, useMemo } from 'react';
import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';

import IUser from 'Types/Entities/IUser';
import { useColors } from 'Hooks/colors';
import { useRoomsUsers } from 'Hooks/roomsUsers';
import { useAuth } from 'Hooks/auth';

import { useRooms } from 'Hooks/rooms';

interface IProps {
  data: IUser;
}

const User: React.FC<IProps> = ({ data }) => {
  const { purple } = useColors();
  const { kickRoomUser, indexRoomUsers } = useRoomsUsers();
  const { user } = useAuth();
  const { currentRoom } = useRooms();

  const [loadingKick, setLoadingKick] = useState(false);

  const showKick = useMemo(
    () => user?.id !== data.id && currentRoom?.moderator_id === user?.id,
    [user, data, currentRoom],
  );

  const handleKickRoomUser = useCallback(async () => {
    if (!currentRoom) {
      return;
    }
    setLoadingKick(true);
    await kickRoomUser({
      room_id: currentRoom.id,
      user_id: data.id,
    });
    await indexRoomUsers(currentRoom.id);
    setLoadingKick(false);
  }, [data, kickRoomUser, indexRoomUsers, currentRoom]);

  return (
    <HStack py="10px" w="100%" alignItems="center">
      <Avatar name={data.nickname} backgroundColor={purple} />
      <VStack spacing="5px" alignItems="flex-start" flex="1">
        <Text lineHeight="20px" fontWeight="bold" maxW="200px" isTruncated>
          {data.nickname}
        </Text>
      </VStack>
      {showKick && (
        <Button
          colorScheme="purple"
          onClick={handleKickRoomUser}
          isLoading={loadingKick}
        >
          kick
        </Button>
      )}
    </HStack>
  );
};

export default User;
