import React from 'react';
import { Icon, Tooltip } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface IProps {
  error: string;
}

const InputError: React.FC<IProps> = ({ error }) => {
  return (
    <Tooltip label={error} bg="red.500" color="white" hasArrow>
      <span>
        <Icon as={FiAlertCircle} color="#E53E3E" boxSize="20px" />
      </span>
    </Tooltip>
  );
};

export default InputError;
