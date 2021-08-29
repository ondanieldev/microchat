import React, { useCallback, useRef, useState } from 'react';
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
import { FiSearch } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import RoomsList from '../RoomsList';

interface IFormData {
  name: string;
}

const SearchRoomForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [roomName, setRoomName] = useState('');

  const handleSearchRooms = useCallback((data: IFormData) => {
    setRoomName(data.name);
  }, []);

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="create room"
        icon={<FiSearch size="20px" />}
        borderRadius="50%"
        colorScheme="purple"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>search rooms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form ref={formRef} onSubmit={handleSearchRooms}>
              <Input type="text" name="name" placeholder="room's name" />
            </Form>

            <RoomsList roomName={roomName} />
          </ModalBody>

          <ModalFooter>
            <Button mr="5px" onClick={onClose} colorScheme="orange">
              close
            </Button>
            <Button onClick={handleSubmitForm} colorScheme="purple">
              search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchRoomForm;
