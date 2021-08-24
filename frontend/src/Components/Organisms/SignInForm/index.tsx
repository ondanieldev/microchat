import React, { useCallback } from 'react';
import { Button } from '@chakra-ui/react';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import { useColors } from 'Hooks/colors';

const SignInForm: React.FC = () => {
  const { orange } = useColors();

  const handleSignIn = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Form onSubmit={handleSignIn}>
      <Input
        focusColor={orange}
        type="text"
        name="nickname"
        placeholder="nickname"
      />
      <Input
        focusColor={orange}
        type="password"
        name="password"
        placeholder="password"
      />
      <Button colorScheme="orange">start chating</Button>
    </Form>
  );
};

export default SignInForm;
