import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FiList } from 'react-icons/fi';

import { useRoomsBar } from 'Hooks/roomsBar';

const RoomsBarOpenButton: React.FC = () => {
  const { handleOpen, isDrawable } = useRoomsBar();

  return (
    <>
      {isDrawable && (
        <IconButton
          onClick={handleOpen}
          aria-label="show rooms bar"
          icon={<FiList size="20px" />}
          borderRadius="50%"
          colorScheme="gray"
          position="absolute"
          left="20px"
          zIndex="100"
        />
      )}
    </>
  );
};

export default RoomsBarOpenButton;
