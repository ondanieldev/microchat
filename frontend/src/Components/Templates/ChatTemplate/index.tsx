import React from 'react';
import { HStack } from '@chakra-ui/react';

import PageContainer from 'Components/Atoms/PageContainer';
import ColorIcon from 'Components/Atoms/ColorIcon';
import RoomsBar from 'Components/Organisms/RoomsBar';
import ChatBox from 'Components/Organisms/ChatBox';

const ChatTemplate: React.FC = () => {
  return (
    <PageContainer maxW="container.xl">
      <ColorIcon />

      <HStack w="100%" h="100%">
        <RoomsBar />

        <ChatBox />
      </HStack>
    </PageContainer>
  );
};

export default ChatTemplate;
