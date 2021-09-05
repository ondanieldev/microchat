import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, VStack } from '@chakra-ui/react';

import Room from 'Components/Molecules/Room';
import IRoom from 'Types/Entities/IRoom';
import { useRooms } from 'Hooks/rooms';

interface IProps {
  roomName?: string;
  onClose?: () => void;
}

const RoomsList: React.FC<IProps> = ({ roomName, onClose }) => {
  const { indexRooms, rooms, roomsLimit } = useRooms();

  const [page, setPage] = useState(1);
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);
  const [lastRoomName, setLastRoomName] = useState('');
  const [loading, setLoading] = useState(false);

  const showLoadMore = useMemo(() => {
    if (!rooms) {
      return false;
    }
    return rooms.entities.length === roomsLimit;
  }, [rooms, roomsLimit]);

  const handleLoadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    indexRooms({
      name: roomName || undefined,
      page,
    }).finally(() => {
      setLoading(false);
    });
  }, [indexRooms, roomName, page]);

  useEffect(() => {
    const newRooms = rooms ? rooms.entities : [];
    if (lastRoomName === roomName) {
      setAllRooms([...allRooms, ...newRooms]);
      return;
    }
    setAllRooms(newRooms);
    setLastRoomName(roomName || '');
    setPage(1);
    // eslint-disable-next-line
  }, [rooms]);

  return (
    <VStack spacing="20px" pt="20px">
      <VStack maxH="400px" w="100%" flex="1" overflowY="auto">
        {allRooms.map(room => (
          <Room key={room.id} data={room} onClose={onClose} />
        ))}
      </VStack>
      {showLoadMore && (
        <Button
          onClick={handleLoadMore}
          isLoading={loading}
          variant="outline"
          colorScheme="purple"
        >
          load more
        </Button>
      )}
    </VStack>
  );
};

export default RoomsList;
