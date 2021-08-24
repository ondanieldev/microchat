import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import api from 'Services/api';
import IRoom from 'Types/Entities/IRoom';
import ISetState from 'Types/Standards/ISetState';
import { useErrors } from './errors';

interface IRoomsContext {
  userRooms: IRoom[];
  searchedUserRooms: IRoom[];
  currentRoom: IRoom | null;
  setCurrentRoom: ISetState<IRoom | null>;
  indexUserRooms(): Promise<void>;
  searchUserRooms(name: string): void;
}

const RoomsContext = createContext<IRoomsContext>({} as IRoomsContext);

const RoomsProvider: React.FC = ({ children }) => {
  const { handleErrors } = useErrors();

  const [userRooms, setUserRooms] = useState<IRoom[]>([]);
  const [searchedUserRooms, setSearchedUserRooms] = useState<IRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);

  const indexUserRooms = useCallback(async () => {
    try {
      const response = await api.get('/rooms/users/me');
      setUserRooms(response.data);
    } catch (err) {
      handleErrors('Error when trying to index rooms', err);
    }
  }, [handleErrors]);

  const searchUserRooms = useCallback(
    (name: string) => {
      const regex = new RegExp(name.toLowerCase(), 'g');
      const searched = userRooms.filter(room =>
        room.name.toLowerCase().match(regex),
      );
      setSearchedUserRooms(searched);
    },
    [userRooms],
  );

  useEffect(() => {
    setSearchedUserRooms(userRooms);
  }, [userRooms]);

  return (
    <RoomsContext.Provider
      value={{
        setCurrentRoom,
        currentRoom,
        userRooms,
        indexUserRooms,
        searchUserRooms,
        searchedUserRooms,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = (): IRoomsContext => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRooms must be used within RoomsProvider');
  }
  return context;
};

export default RoomsProvider;
