/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useBreakpointValue } from '@chakra-ui/react';
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

interface IRoomsBarContext {
  isOpen: boolean;
  isDrawable?: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
}

const RoomsBarContext = createContext<IRoomsBarContext>({} as IRoomsBarContext);

export const RoomsBarProvider: React.FC = ({ children }) => {
  const isDrawable = useBreakpointValue<boolean>({
    base: true,
    md: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (!isDrawable) return;
    setIsOpen(true);
  }, [isDrawable]);

  const handleClose = useCallback(() => {
    if (!isDrawable) return;
    setIsOpen(false);
  }, [isDrawable]);

  const handleToggle = useCallback(() => {
    if (!isDrawable) return;
    setIsOpen(!isOpen);
  }, [isOpen, isDrawable]);

  useEffect(() => {
    setIsOpen(!isDrawable);
  }, [isDrawable]);

  return (
    <RoomsBarContext.Provider
      value={{ handleClose, isOpen, handleOpen, handleToggle, isDrawable }}
    >
      {children}
    </RoomsBarContext.Provider>
  );
};

export const useRoomsBar = (): IRoomsBarContext => {
  const context = useContext(RoomsBarContext);
  if (!context) {
    throw new Error('useRoomsBar must be used within RoomsBarProvider');
  }
  return context;
};

export default RoomsBarProvider;
