import React from 'react';
import { HStack } from '@chakra-ui/react';

import CreateRoomForm from '../CreateRoomForm';
import SearchRoomForm from '../SearchRoomForm';

const RoomsTools: React.FC = () => {
  return (
    <HStack pb="20px" spacing="20px">
      <CreateRoomForm />

      <SearchRoomForm />
    </HStack>
  );
};

export default RoomsTools;
