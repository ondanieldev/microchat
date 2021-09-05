import React from 'react';
import {
  Stack,
  StackDirection,
  StackProps,
  useBreakpointValue,
} from '@chakra-ui/react';

interface IProps extends StackProps {
  isWrappable?: boolean;
}

const InputGroup: React.FC<IProps> = ({ children, isWrappable, ...rest }) => {
  const direction = useBreakpointValue<StackDirection>({
    base: 'column',
    md: 'row',
  });

  return (
    <Stack direction={isWrappable ? direction : 'row'} spacing="20px" {...rest}>
      {children}
    </Stack>
  );
};

export default InputGroup;
