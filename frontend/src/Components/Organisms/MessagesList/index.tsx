import React, { useEffect } from 'react';
import { Flex, VStack } from '@chakra-ui/react';

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
          <Flex key={message.id} direction="column" w="100%">
            {message.type === 'text' && <Message data={message} />}
            {message.type === 'info' && <InfoMessage data={message} />}
          </Flex>
        ))}
    </VStack>
  );
};

export default MessagesList;
