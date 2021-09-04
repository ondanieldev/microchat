import React, { useMemo } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Icon, useColorMode } from '@chakra-ui/react';

const ColorIcon: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = useMemo(
    () => (colorMode === 'dark' ? FiMoon : FiSun),
    [colorMode],
  );

  return (
    <Icon
      as={icon}
      position="absolute"
      top="20px"
      left="50%"
      boxSize="20px"
      onClick={toggleColorMode}
    />
  );
};

export default ColorIcon;
