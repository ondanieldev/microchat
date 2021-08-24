import React from 'react';

import { useColors } from 'Hooks/colors';
import Card from '../Card';

const HomeCard: React.FC = ({ children }) => {
  const { orange, purple } = useColors();

  return (
    <Card
      w="100%"
      border="5px solid"
      borderTopColor={orange}
      borderLeftColor={orange}
      borderBottomColor={purple}
      borderRightColor={purple}
    >
      {children}
    </Card>
  );
};

export default HomeCard;
