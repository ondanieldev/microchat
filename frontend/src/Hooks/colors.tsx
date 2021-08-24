/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useContext } from 'react';
import { useColorModeValue } from '@chakra-ui/react';

interface IColorsContext {
  purple: string;
  orange: string;
}

const ColorsContext = createContext<IColorsContext>({} as IColorsContext);

export const ColorsProvider: React.FC = ({ children }) => {
  const purple = useColorModeValue('purple.500', 'purple.400');
  const orange = useColorModeValue('orange.500', 'orange.400');

  return (
    <ColorsContext.Provider value={{ purple, orange }}>
      {children}
    </ColorsContext.Provider>
  );
};

export const useColors = (): IColorsContext => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error('useColors must be used within ColorsProvider');
  }
  return context;
};

export default ColorsProvider;
