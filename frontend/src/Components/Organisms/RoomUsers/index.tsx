import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FiUsers } from 'react-icons/fi';

import UsersList from '../UsersList';

const RoomParticipants: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="absolute" right="0">
      <IconButton
        onClick={onOpen}
        aria-label="view participants"
        icon={<FiUsers size="20px" />}
        borderRadius="50%"
        colorScheme="purple"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>room participants</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UsersList />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="orange">
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RoomParticipants;
