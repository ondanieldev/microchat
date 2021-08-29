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
import IDefaultRequest from 'Types/Standards/IDefaultRequest';
import IOffsetPaginated from 'Types/Standards/IOffsetPaginated';
import ICreateRoom from 'Types/DTOs/ICreateRoom';
import IFIlterRooms from 'Types/DTOs/IFilterRooms';
import CreateRoomSchema from 'Schemas/CreateRoomSchema';
import { useErrors } from './errors';

interface IRoomsContext {
  userRooms: IRoom[];
  searchedUserRooms: IRoom[];
  currentRoom: IRoom | null;
  setCurrentRoom: ISetState<IRoom | null>;
  rooms: IOffsetPaginated<IRoom> | null;
  roomsLimit: number;
  indexUserRooms(): Promise<void>;
  searchUserRooms(name: string): void;
  createRoom(data: ICreateRoom & IDefaultRequest): Promise<void>;
  indexRooms(data: IFIlterRooms): Promise<void>;
}

const RoomsContext = createContext<IRoomsContext>({} as IRoomsContext);

const RoomsProvider: React.FC = ({ children }) => {
  const roomsLimit = 5;

  const { handleErrors } = useErrors();

  const [userRooms, setUserRooms] = useState<IRoom[]>([]);
  const [rooms, setRooms] = useState<IOffsetPaginated<IRoom> | null>(null);
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

  const createRoom = useCallback(
    async ({ formRef, ...data }: ICreateRoom & IDefaultRequest) => {
      try {
        formRef.current?.setErrors({});
        await CreateRoomSchema.validate(data, {
          abortEarly: false,
        });
        await api.post('/rooms', data);
      } catch (err) {
        handleErrors('Error when trying to create room', err, formRef);
      }
    },
    [handleErrors],
  );

  const indexRooms = useCallback(
    async (data: IFIlterRooms) => {
      try {
        const response = await api.get('/rooms', {
          params: {
            limit: roomsLimit,
            ...data,
          },
        });
        setRooms(response.data);
      } catch (err) {
        handleErrors('Error when trying to index rooms', err);
      }
    },
    [handleErrors],
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
        createRoom,
        indexRooms,
        rooms,
        roomsLimit,
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
