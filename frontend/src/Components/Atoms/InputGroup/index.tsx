import React from 'react';
import { HStack, StackProps } from '@chakra-ui/react';

const InputGroup: React.FC<StackProps> = ({ children, ...rest }) => {
  return (
    <HStack spacing="20px" {...rest}>
      {children}
    </HStack>
  );
};

export default InputGroup;
