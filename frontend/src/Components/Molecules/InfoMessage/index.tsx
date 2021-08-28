import React, { useMemo } from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

import IMessage from 'Types/Entities/IMessage';
import formatDate from 'Helpers/formatDate';

interface IProps {
  data: IMessage;
}

const InfoMessage: React.FC<IProps> = ({ data }) => {
  const backgroundColor = useColorModeValue('white', 'gray.700');
  const timeColor = useColorModeValue('gray.500', 'gray.400');

  const time = useMemo(() => formatDate(data.created_at), [data]);

  return (
    <Box
      p="10px"
      backgroundColor={backgroundColor}
      borderRadius="5px"
      w="100%"
      maxW="500px"
      alignSelf="center"
    >
      <Text>{data.content}</Text>
      <Text
        mt="10px"
        lineHeight="0px"
        mb="5px"
        textAlign="center"
        fontSize="sm"
        color={timeColor}
      >
        {time}
      </Text>
    </Box>
  );
};

export default InfoMessage;
