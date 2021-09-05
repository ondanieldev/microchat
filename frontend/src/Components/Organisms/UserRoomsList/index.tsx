import React, { useEffect, useState } from 'react';
import { Spinner, VStack } from '@chakra-ui/react';

import Room from 'Components/Molecules/Room';
import { useRooms } from 'Hooks/rooms';

const UserRoomsList: React.FC = () => {
  const { indexUserRooms, searchedUserRooms } = useRooms();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    indexUserRooms().finally(() => {
      setLoading(false);
    });
  }, [indexUserRooms]);

  return (
    <VStack w="100%" flex="1" overflowY="auto">
      {loading && <Spinner />}
      {searchedUserRooms.map(room => (
        <Room key={`user_${room.id}`} data={room} isUserRoom />
      ))}
    </VStack>
  );
};

export default UserRoomsList;
