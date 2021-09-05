import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import { useRoomsBar } from 'Hooks/roomsBar';

const RoomsBarCloseButton: React.FC = () => {
  const { handleClose, isDrawable } = useRoomsBar();

  return (
    <>
      {isDrawable && (
        <IconButton
          onClick={handleClose}
          aria-label="close rooms bar"
          icon={<FiX size="20px" />}
          borderRadius="50%"
          colorScheme="gray"
          position="absolute"
          top="20px"
          right="20px"
          zIndex="100"
        />
      )}
    </>
  );
};

export default RoomsBarCloseButton;
