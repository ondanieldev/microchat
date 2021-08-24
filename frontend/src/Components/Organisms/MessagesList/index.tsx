import React from 'react';
import { VStack } from '@chakra-ui/react';

import Message from 'Components/Molecules/TextMessage';
import InfoMessage from 'Components/Molecules/InfoMessage';

const MessagesList: React.FC = () => {
  return (
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
  );
};

export default MessagesList;
