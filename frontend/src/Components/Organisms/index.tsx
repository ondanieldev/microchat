import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import Card from 'Components/Atoms/Card';

const ChatBox: React.FC = () => {
  const backgroundColor = useColorModeValue('gray.300', 'gray.800');

  return (
    <Card
      borderStartRadius="0px"
      backgroundColor={backgroundColor}
      w="100%"
      h="100%"
      m="0px !important"
    >
      a
    </Card>
  );
};

export default ChatBox;
