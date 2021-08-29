import React, { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';

import User from 'Components/Molecules/User';
import { useRoomsUsers } from 'Hooks/roomsUsers';
import { useRooms } from 'Hooks/rooms';

const UsersList: React.FC = () => {
  const { indexRoomUsers, roomUsers } = useRoomsUsers();
  const { currentRoom } = useRooms();

  useEffect(() => {
    if (!currentRoom) {
      return;
    }
    indexRoomUsers(currentRoom.id);
  }, [indexRoomUsers, currentRoom]);

  return (
    <VStack maxH="400px" w="100%" flex="1" overflowY="auto">
      {currentRoom &&
        roomUsers.map(roomUser => <User key={roomUser.id} data={roomUser} />)}
    </VStack>
  );
};

export default UsersList;
