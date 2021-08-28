import React, { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';

import Room from 'Components/Molecules/Room';
import { useRooms } from 'Hooks/rooms';

const RoomsList: React.FC = () => {
  const { indexUserRooms, searchedUserRooms } = useRooms();

  useEffect(() => {
    indexUserRooms();
  }, [indexUserRooms]);

  return (
    <VStack w="100%">
      {searchedUserRooms.map(room => (
        <Room key={room.id} data={room} />
      ))}
    </VStack>
  );
};

export default RoomsList;
