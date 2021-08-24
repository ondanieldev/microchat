import React, { useCallback } from 'react';
import { Button } from '@chakra-ui/react';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import InputGroup from 'Components/Atoms/InputGroup';
import { useColors } from 'Hooks/colors';

const SignUpForm: React.FC = () => {
  const { purple } = useColors();

  const handleSignUp = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Form onSubmit={handleSignUp}>
      <Input
        focusColor={purple}
        type="text"
        name="nickname"
        placeholder="nickname"
      />
      <InputGroup>
        <Input
          focusColor={purple}
          type="password"
          name="password"
          placeholder="password"
        />
        <Input
          focusColor={purple}
          type="password"
          name="confirm_password"
          placeholder="confirm password"
        />
      </InputGroup>
      <Button colorScheme="purple">create account</Button>
    </Form>
  );
};

export default SignUpForm;
