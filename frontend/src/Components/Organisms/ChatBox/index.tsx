import React, { useMemo } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { useRooms } from 'Hooks/rooms';
import { useRoomsBar } from 'Hooks/roomsBar';
import Card from 'Components/Atoms/Card';
import RoomsBarOpenButton from 'Components/Atoms/RoomsBarOpenButton';
import MessagesList from '../MessagesList';
import SendMessageForm from '../SendMessageForm';
import ChatBoxActionButtons from '../ChatBoxActionButtons';

const ChatBox: React.FC = () => {
  const { currentRoom } = useRooms();
  const { isOpen, isDrawable } = useRoomsBar();

  const backgroundColor = useColorModeValue('gray.100', 'gray.800');

  const show = useMemo(() => {
    if (!isDrawable) return true;
    if (!isOpen) return true;
    return false;
  }, [isDrawable, isOpen]);

  return (
    <>
      {show && (
        <Card
          borderStartRadius="0px"
          backgroundColor={backgroundColor}
          w="100%"
          h="100%"
          m="0px !important"
          display="flex"
          flexDirection="column"
        >
          <Box position="relative">
            <RoomsBarOpenButton />
          </Box>
          {currentRoom && (
            <Flex direction="column" h="100%" position="relative">
              <ChatBoxActionButtons />

              <MessagesList />

              <SendMessageForm />
            </Flex>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatBox;
