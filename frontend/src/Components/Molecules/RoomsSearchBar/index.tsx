import React, { useCallback, useRef } from 'react';
import { IconButton, VStack } from '@chakra-ui/react';

import Input from 'Components/Atoms/Input';
import Form from 'Components/Atoms/Form';
import { useRooms } from 'Hooks/rooms';
import InputGroup from 'Components/Atoms/InputGroup';
import { FiSearch } from 'react-icons/fi';

import { FormHandles } from '@unform/core';

interface IFormData {
  search: string;
}

const RoomsSearchBar: React.FC = () => {
  const { searchUserRooms } = useRooms();

  const formRef = useRef<FormHandles>(null);

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const handleSearchRoom = useCallback(
    (data: IFormData) => {
      searchUserRooms(data.search);
    },
    [searchUserRooms],
  );

  return (
    <VStack p="20px" pb="0px">
      <Form onSubmit={handleSearchRoom} ref={formRef}>
        <InputGroup spacing="0px">
          <Input
            type="text"
            name="search"
            placeholder="search"
            borderEndRadius="0px"
            onChange={handleSubmitForm}
          />
          <IconButton
            aria-label="search room"
            icon={<FiSearch size="20px" />}
            borderStartRadius="0px"
            type="submit"
          />
        </InputGroup>
      </Form>
    </VStack>
  );
};

export default RoomsSearchBar;
