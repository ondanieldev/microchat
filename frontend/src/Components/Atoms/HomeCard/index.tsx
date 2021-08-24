import { useColors } from 'Hooks/colors';
import React from 'react';

import Card from '../Card';

const HomeCard: React.FC = ({ children }) => {
  const { orange, purple } = useColors();

  return (
    <Card
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
