import React, { useCallback } from 'react';
import { FiSend } from 'react-icons/fi';
import { IconButton, useColorModeValue, VStack } from '@chakra-ui/react';

import Card from 'Components/Atoms/Card';
import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import InputGroup from 'Components/Atoms/InputGroup';
import Message from 'Components/Molecules/TextMessage';
import InfoMessage from 'Components/Molecules/InfoMessage';

const ChatBox: React.FC = () => {
  const backgroundColor = useColorModeValue('gray.300', 'gray.800');

  const handleSendMessage = useCallback(data => {
    console.log(data);
  }, []);

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
      <VStack spacing="20px" h="100%" overflowY="auto" mb="20px">
        <Message />
        <Message />
        <InfoMessage />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <InfoMessage />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <InfoMessage />
      </VStack>

      <Form onSubmit={handleSendMessage}>
        <InputGroup spacing="10px">
          <Input
            type="text"
            name="type something"
            placeholder="type something..."
          />
          <IconButton aria-label="send-message" icon={<FiSend size="15px" />} />
        </InputGroup>
      </Form>
    </Card>
  );
};

export default ChatBox;
