import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import Card from 'Components/Atoms/Card';
import { useRooms } from 'Hooks/rooms';
import MessagesList from '../MessagesList';
import SendMessageForm from '../SendMessageForm';
import RoomUsers from '../RoomUsers';

const ChatBox: React.FC = () => {
  const { currentRoom } = useRooms();
  const backgroundColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Card
      borderStartRadius="0px"
      backgroundColor={backgroundColor}
      w="100%"
      h="100%"
      m="0px !important"
      display="flex"
      flexDirection="column"
    >
      {currentRoom && (
        <Flex direction="column" h="100%" position="relative">
          <RoomUsers />

          <MessagesList />

          <SendMessageForm />
        </Flex>
      )}
    </Card>
  );
};

export default ChatBox;
