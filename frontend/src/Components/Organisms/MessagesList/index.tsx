import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Box, Flex, Spinner, VStack } from '@chakra-ui/react';

import Message from 'Components/Molecules/TextMessage';
import InfoMessage from 'Components/Molecules/InfoMessage';
import { useMessages } from 'Hooks/messages';
import { useRooms } from 'Hooks/rooms';

const MessagesList: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const { currentRoom } = useRooms();
  const { roomMessages, indexRoomMessages } = useMessages();

  const handleOnScroll = useCallback(async () => {
    if (
      !chatRef.current ||
      chatRef.current.scrollTop !== 0 ||
      !roomMessages ||
      !roomMessages.next_cursor ||
      !currentRoom ||
      loading
    )
      return;

    setLoading(true);
    const scrollPosition = chatRef.current.offsetHeight;
    await indexRoomMessages(
      {
        room_id: currentRoom.id,
        cursor: roomMessages.next_cursor,
      },
      roomMessages.entities,
    );
    chatRef.current.scrollTo(0, scrollPosition);
    setLoading(false);
  }, [indexRoomMessages, currentRoom, roomMessages, loading]);

  useEffect(() => {
    setLoading(true);
    if (!currentRoom) return;
    indexRoomMessages({
      room_id: currentRoom.id,
    })
      .then(() => {
        if (!chatRef.current) return;
        const end = chatRef.current.scrollHeight;
        chatRef.current.scrollTo(0, end);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [indexRoomMessages, currentRoom]);

  useEffect(() => {
    if (!chatRef.current) return;
    const unVisbile = chatRef.current.scrollTop;
    const visible = chatRef.current.offsetHeight;
    const escrow = 100;
    const end = chatRef.current.scrollHeight;
    if (unVisbile + visible + escrow < end) return;
    chatRef.current.scrollTo(0, end);
  }, [roomMessages]);

  return (
    <VStack
      mb="20px"
      spacing="20px"
      ref={chatRef}
      overflowY="auto"
      flex="1"
      px="20px"
      onScroll={handleOnScroll}
    >
      {loading && (
        <Box>
          <Spinner />
        </Box>
      )}
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
