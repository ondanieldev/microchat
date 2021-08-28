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
import { FiPlus } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import ICreateRoom from 'Types/DTOs/ICreateRoom';
import { useRooms } from 'Hooks/rooms';

const CreateRoomForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createRoom, indexUserRooms } = useRooms();

  const [loading, setLoading] = useState(false);

  const handleCreateRoom = useCallback(
    async (data: ICreateRoom) => {
      setLoading(true);
      await createRoom({
        ...data,
        formRef,
      });
      await indexUserRooms();
      onClose();
      setLoading(false);
    },
    [createRoom, indexUserRooms, onClose],
  );

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="create room"
        icon={<FiPlus size="20px" />}
        borderRadius="50%"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>create room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form ref={formRef} onSubmit={handleCreateRoom}>
              <Input type="text" name="name" placeholder="room's name" />
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              mr="5px"
              onClick={onClose}
              colorScheme="purple"
              isDisabled={loading}
            >
              close
            </Button>
            <Button
              onClick={handleSubmitForm}
              colorScheme="orange"
              isLoading={loading}
            >
              create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoomForm;
