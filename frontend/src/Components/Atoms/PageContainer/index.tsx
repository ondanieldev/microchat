import React from 'react';
import { Container, ContainerProps, Flex } from '@chakra-ui/react';

const PageContainer: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" h="100vh">
      <Container maxW="container.md" {...rest}>
        {children}
      </Container>
    </Flex>
  );
};

export default PageContainer;
