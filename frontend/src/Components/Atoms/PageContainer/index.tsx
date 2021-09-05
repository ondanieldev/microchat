import React from 'react';
import {
  Container,
  ContainerProps,
  useBreakpointValue,
} from '@chakra-ui/react';

const PageContainer: React.FC<ContainerProps> = ({ children, ...rest }) => {
  const padding = useBreakpointValue({
    base: '20px',
    md: '60px',
  });

  return (
    <Container
      px={padding}
      py="60px"
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
