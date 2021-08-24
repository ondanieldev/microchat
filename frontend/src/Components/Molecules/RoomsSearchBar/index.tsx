import React, { useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IconButton, InputGroup, VStack } from '@chakra-ui/react';

import Input from 'Components/Atoms/Input';
import Form from 'Components/Atoms/Form';

const RoomsSearchBar: React.FC = () => {
  const handleSearchRoom = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <VStack p="20px" pb="0px">
      <Form onSubmit={handleSearchRoom}>
        <InputGroup>
          <Input
            type="text"
            name="search"
            placeholder="search"
            borderEndRadius="0px"
          />
          <IconButton
            aria-label="search room"
            icon={<FiSearch size="20px" />}
            borderStartRadius="0px"
          />
        </InputGroup>
      </Form>
    </VStack>
  );
};

export default RoomsSearchBar;
