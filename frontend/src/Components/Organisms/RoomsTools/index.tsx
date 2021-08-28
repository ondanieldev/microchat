import React from 'react';
import { HStack } from '@chakra-ui/react';

import CreateRoomForm from '../CreateRoomForm';

const RoomsTools: React.FC = () => {
  return (
    <HStack pb="20px">
      <CreateRoomForm />
    </HStack>
  );
};

export default RoomsTools;
