import React from 'react';
import {
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

const RoomUsers: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
    </>
  );
};

export default RoomUsers;
