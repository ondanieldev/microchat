import React, { useCallback, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from 'Hooks/auth';

const SignOutButton: React.FC = () => {
  const { signOut } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  }, [signOut]);

  return (
    <IconButton
      isLoading={loading}
      onClick={handleSignOut}
      aria-label="sign out"
      icon={<FiLogOut size="20px" />}
      borderRadius="50%"
      colorScheme="orange"
    />
  );
};

export default SignOutButton;
