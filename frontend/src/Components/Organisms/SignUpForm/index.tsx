import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Button } from '@chakra-ui/react';

import ISignUp from 'Types/DTOs/ISignUp';
import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import InputGroup from 'Components/Atoms/InputGroup';
import { useColors } from 'Hooks/colors';
import { useAuth } from 'Hooks/auth';

const SignUpForm: React.FC = () => {
  const { purple } = useColors();
  const { signUp } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async (data: ISignUp) => {
      setLoading(true);
      await signUp({
        ...data,
        formRef,
      });
      setLoading(false);
    },
    [signUp],
  );

  return (
    <Form onSubmit={handleSignUp} ref={formRef}>
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
      <Button isLoading={loading} type="submit" colorScheme="purple">
        create account
      </Button>
    </Form>
  );
};

export default SignUpForm;
