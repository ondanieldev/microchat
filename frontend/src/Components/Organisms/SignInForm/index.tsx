import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import ISignIn from 'Types/DTOs/ISignIn';
import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import { useColors } from 'Hooks/colors';
import { useAuth } from 'Hooks/auth';

const SignInForm: React.FC = () => {
  const { orange } = useColors();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async (data: ISignIn) => {
      setLoading(true);
      await signIn({
        ...data,
        formRef,
      });
      setLoading(false);
    },
    [signIn],
  );

  return (
    <Form onSubmit={handleSignIn} ref={formRef}>
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
      <Button isLoading={loading} type="submit" colorScheme="orange">
        start chating
      </Button>
    </Form>
  );
};

export default SignInForm;
