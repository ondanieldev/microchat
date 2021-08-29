import React, { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';

import Message from 'Components/Molecules/TextMessage';
import InfoMessage from 'Components/Molecules/InfoMessage';
import { useMessages } from 'Hooks/messages';
import { useRooms } from 'Hooks/rooms';

const MessagesList: React.FC = () => {
  const { currentRoom } = useRooms();
  const { roomMessages, indexRoomMessages } = useMessages();

  useEffect(() => {
    indexRoomMessages({
      room_id: currentRoom?.id,
    });
  }, [indexRoomMessages, currentRoom]);

  return (
    <VStack spacing="20px" overflowY="auto" mb="20px" flex="1">
      {roomMessages &&
        roomMessages.entities.map(message => (
          <>
            {message.type === 'text' && (
              <Message key={message.id} data={message} />
            )}
            {message.type === 'info' && (
              <InfoMessage key={message.id} data={message} />
            )}
          </>
        ))}
    </VStack>
  );
};

export default MessagesList;
