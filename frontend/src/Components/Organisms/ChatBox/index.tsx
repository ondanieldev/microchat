import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';

import Card from 'Components/Atoms/Card';
import MessagesList from '../MessagesList';
import SendMessageForm from '../SendMessageForm';

const ChatBox: React.FC = () => {
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
      <MessagesList />

      <SendMessageForm />
    </Card>
  );
};

export default ChatBox;
