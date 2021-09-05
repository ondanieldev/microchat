import React from 'react';
import { HStack } from '@chakra-ui/react';

import RoomUsers from '../RoomUsers';
import LeaveRoom from '../LeaveRoom';

const ChatBoxActionButtons: React.FC = () => {
  return (
    <HStack spacing="20px" position="absolute" right="20px" zIndex="100">
      <RoomUsers />

      <LeaveRoom />
    </HStack>
  );
};

export default ChatBoxActionButtons;
