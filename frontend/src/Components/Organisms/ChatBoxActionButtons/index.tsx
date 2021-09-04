import React from 'react';
import { HStack } from '@chakra-ui/react';

import RoomUsers from '../RoomUsers';
import LeaveRoom from '../LeaveRoom';

const ChatBoxActionButtons: React.FC = () => {
  return (
    <HStack spacing="20px" position="absolute" right="0">
      <RoomUsers />

      <LeaveRoom />
    </HStack>
  );
};

export default ChatBoxActionButtons;
