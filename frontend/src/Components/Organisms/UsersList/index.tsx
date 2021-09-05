import React, { useEffect, useState } from 'react';
import { Spinner, VStack } from '@chakra-ui/react';

import User from 'Components/Molecules/User';
import { useRoomsUsers } from 'Hooks/roomsUsers';
import { useRooms } from 'Hooks/rooms';

const UsersList: React.FC = () => {
  const { indexRoomUsers, roomUsers } = useRoomsUsers();
  const { currentRoom } = useRooms();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentRoom) {
      return;
    }
    setLoading(true);
    indexRoomUsers(currentRoom.id).finally(() => {
      setLoading(false);
    });
  }, [indexRoomUsers, currentRoom]);

  return (
    <VStack maxH="400px" w="100%" flex="1" overflowY="auto">
      {loading && <Spinner />}
      {currentRoom &&
        roomUsers.map(roomUser => <User key={roomUser.id} data={roomUser} />)}
    </VStack>
  );
};

export default UsersList;
