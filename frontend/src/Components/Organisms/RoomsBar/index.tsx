import React, { useMemo } from 'react';
import { VStack } from '@chakra-ui/react';

import { useRoomsBar } from 'Hooks/roomsBar';
import Card from 'Components/Atoms/Card';
import RoomsBarCloseButton from 'Components/Atoms/RoomsBarCloseButton';
import RoomsSearchBar from 'Components/Molecules/RoomsSearchBar';
import UserRoomsList from '../UserRoomsList';
import RoomsTools from '../RoomsTools';

const RoomsBar: React.FC = () => {
  const { isOpen, isDrawable } = useRoomsBar();

  const maxW = useMemo(() => (isDrawable ? '100%' : '300px'), [isDrawable]);

  return (
    <>
      {isOpen && (
        <Card borderEndRadius="0px" maxW={maxW} w="100%" h="100%" p="0px">
          <VStack spacing="20px" h="100%" position="relative">
            <RoomsBarCloseButton />

            <RoomsSearchBar />

            <UserRoomsList />

            <RoomsTools />
          </VStack>
        </Card>
      )}
    </>
  );
};

export default RoomsBar;
