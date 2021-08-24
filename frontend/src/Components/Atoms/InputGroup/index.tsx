import React from 'react';
import { ContainerProps, HStack } from '@chakra-ui/react';

const InputGroup: React.FC<ContainerProps> = ({ children }) => {
  return <HStack spacing="20px">{children}</HStack>;
};

export default InputGroup;
