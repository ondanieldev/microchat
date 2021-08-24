import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

const Card: React.FC<BoxProps> = ({ children, ...rest }) => {
  const cardColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      p="20px"
      backgroundColor={cardColor}
      boxShadow="0 5px 5px 0 rgb(35 40 45 / 10%)"
      borderRadius="10px"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
