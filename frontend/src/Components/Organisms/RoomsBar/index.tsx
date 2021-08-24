import React from 'react';
import { VStack } from '@chakra-ui/react';

import Card from 'Components/Atoms/Card';
import RoomsSearchBar from 'Components/Molecules/RoomsSearchBar';
import RoomsList from '../RoomsList';

const RoomsBar: React.FC = () => {
  return (
    <Card borderEndRadius="0px" maxW="300px" w="100%" h="100%" p="0px">
      <VStack spacing="20px">
        <RoomsSearchBar />

        <RoomsList />
      </VStack>
    </Card>
  );
};

export default RoomsBar;
