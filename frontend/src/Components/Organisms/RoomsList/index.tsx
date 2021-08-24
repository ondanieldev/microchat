import React from 'react';
import { VStack } from '@chakra-ui/react';

import Room from 'Components/Molecules/Room';

const RoomsList: React.FC = () => {
  return (
    <VStack w="100%">
      <Room />
      <Room />
      <Room />
      <Room />
    </VStack>
  );
};

export default RoomsList;
