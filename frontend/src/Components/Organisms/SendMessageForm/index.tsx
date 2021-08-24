import React, { useCallback } from 'react';
import { FiSend } from 'react-icons/fi';
import { IconButton } from '@chakra-ui/react';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import InputGroup from 'Components/Atoms/InputGroup';
import { useColors } from 'Hooks/colors';

const SendMessageForm: React.FC = () => {
  const { orange } = useColors();

  const handleSendMessage = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Form onSubmit={handleSendMessage}>
      <InputGroup spacing="10px">
        <Input
          type="text"
          name="type something"
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
          colorScheme="orange"
          aria-label="send-message"
          icon={<FiSend size="15px" />}
        />
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
