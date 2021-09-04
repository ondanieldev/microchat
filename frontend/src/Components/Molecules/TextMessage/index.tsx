import React, { useMemo } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

import { useColors } from 'Hooks/colors';
import IMessage from 'Types/Entities/IMessage';

import { useAuth } from 'Hooks/auth';
import formatDate from 'Helpers/formatDate';

interface IProps {
  data: IMessage;
}

const TextMessage: React.FC<IProps> = ({ data }) => {
  const { user } = useAuth();
  const { orange, purple } = useColors();
  const backgroundColor = useColorModeValue('white', 'gray.700');
  const timeColor = useColorModeValue('gray.500', 'gray.400');

  const direction = useMemo(
    () => (data.user?.id === user?.id ? 'flex-end' : 'flex-start'),
    [data, user],
  );
  const color = useMemo(
    () => (data.user?.id === user?.id ? orange : purple),
    [data, user, orange, purple],
  );
  const time = useMemo(() => formatDate(data.created_at), [data]);

  return (
    <Box
      p="10px"
      backgroundColor={backgroundColor}
      borderRadius="5px"
      w="100%"
      maxW="300px"
      position="relative"
      alignSelf={direction}
    >
      <Text fontWeight="bold" color={color}>
        {data.user?.nickname}
      </Text>
      <Text>{data.content}</Text>
      <Text
        lineHeight="0px"
        fontSize="sm"
        position="absolute"
        bottom="15px"
        right="10px"
        color={timeColor}
      >
        {time}
      </Text>
    </Box>
  );
};

export default TextMessage;
