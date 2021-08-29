import React, { useCallback, useState } from 'react';
import { Avatar, Button, HStack, Text, VStack } from '@chakra-ui/react';

import IUser from 'Types/Entities/IUser';
import { useColors } from 'Hooks/colors';

interface IProps {
  data: IUser;
}

const User: React.FC<IProps> = ({ data }) => {
  const { purple } = useColors();

  const [loadingKick, setLoadingKick] = useState(false);

  const handleKickUser = useCallback(() => {
    console.log('kick user');
  }, []);

  return (
    <HStack py="10px" w="100%" alignItems="center">
      <Avatar name={data.nickname} backgroundColor={purple} />
      <VStack spacing="5px" alignItems="flex-start" flex="1">
        <Text lineHeight="20px" fontWeight="bold" maxW="200px" isTruncated>
          {data.nickname}
        </Text>
      </VStack>
      <Button
        colorScheme="purple"
        onClick={handleKickUser}
        isLoading={loadingKick}
      >
        kick
      </Button>
    </HStack>
  );
};

export default User;
