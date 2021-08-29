import React, { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';

import Room from 'Components/Molecules/Room';
import { useRooms } from 'Hooks/rooms';

const UserRoomsList: React.FC = () => {
  const { indexUserRooms, searchedUserRooms } = useRooms();

  useEffect(() => {
    indexUserRooms();
  }, [indexUserRooms]);

  return (
    <VStack w="100%" flex="1">
      {searchedUserRooms.map(room => (
        <Room key={`user_${room.id}`} data={room} isUserRoom />
      ))}
    </VStack>
  );
};

export default UserRoomsList;
