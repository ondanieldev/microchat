import React, { useCallback, useState, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { IconButton } from '@chakra-ui/react';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import InputGroup from 'Components/Atoms/InputGroup';
import { useColors } from 'Hooks/colors';
import { useMessages } from 'Hooks/messages';
import { useRooms } from 'Hooks/rooms';

import { FormHandles } from '@unform/core';

interface IFormData {
  content: string;
}

const SendMessageForm: React.FC = () => {
  const { currentRoom } = useRooms();
  const { sendMessage, indexRoomMessages } = useMessages();
  const { orange } = useColors();

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleSendMessage = useCallback(
    async (data: IFormData) => {
      if (!currentRoom) {
        return;
      }
      setLoading(true);
      await sendMessage({
        ...data,
        room_id: currentRoom.id,
        formRef,
      });
      await indexRoomMessages({
        room_id: currentRoom.id,
      });
      setLoading(false);
    },
    [sendMessage, indexRoomMessages, currentRoom],
  );

  return (
    <Form onSubmit={handleSendMessage} ref={formRef}>
      <InputGroup spacing="10px">
        <Input
          type="text"
          name="content"
          placeholder="type something..."
          borderColor={orange}
          _hover={{
            borderColor: orange,
          }}
          _focus={{
            borderColor: orange,
          }}
        />
        <IconButton
          isLoading={loading}
          type="submit"
          colorScheme="orange"
          aria-label="send-message"
          icon={<FiSend size="15px" />}
        />
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
