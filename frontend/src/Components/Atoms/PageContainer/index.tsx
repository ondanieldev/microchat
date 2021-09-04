import React from 'react';
import { Container, ContainerProps } from '@chakra-ui/react';

const PageContainer: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <Container
      p="60px"
      w="100%"
      h="100vh"
      display="flex"
      maxW="container.md"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
