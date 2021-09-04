import React from 'react';
import { HStack } from '@chakra-ui/react';

import CreateRoomForm from '../CreateRoomForm';
import SearchRoomForm from '../SearchRoomForm';
import SignOutButton from '../SignOutButton';

const RoomsTools: React.FC = () => {
  return (
    <HStack pb="20px" spacing="20px">
      <CreateRoomForm />

      <SearchRoomForm />

      <SignOutButton />
    </HStack>
  );
};

export default RoomsTools;
