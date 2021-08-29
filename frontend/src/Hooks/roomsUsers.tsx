import React, { createContext, useContext, useState, useCallback } from 'react';

import api from 'Services/api';
import IKickRoomUser from 'Types/DTOs/IKickRoomUser';
import IUser from 'Types/Entities/IUser';
import { useErrors } from './errors';

interface IRoomsUsersContext {
  roomUsers: IUser[];
  indexRoomUsers(room_id: string): Promise<void>;
  kickRoomUser(data: IKickRoomUser): Promise<void>;
  leaveRoom(room_id: string): Promise<void>;
}

const RoomsUsersContext = createContext<IRoomsUsersContext>(
  {} as IRoomsUsersContext,
);

const RoomsUsersProvider: React.FC = ({ children }) => {
  const { handleErrors } = useErrors();

  const [roomUsers, setRoomUsers] = useState<IUser[]>([]);

  const indexRoomUsers = useCallback(
    async (room_id: string) => {
      try {
        const response = await api.get(`/rooms/users/${room_id}`);
        setRoomUsers(response.data);
      } catch (err) {
        handleErrors("Error when trying to index room's users", err);
      }
    },
    [handleErrors],
  );

  const kickRoomUser = useCallback(
    async (data: IKickRoomUser) => {
      try {
        await api.post('/rooms/users/kick', data);
      } catch (err) {
        handleErrors('Error when trying to kick user', err);
      }
    },
    [handleErrors],
  );

  const leaveRoom = useCallback(
    async (room_id: string) => {
      try {
        await api.delete(`/rooms/users/${room_id}`);
      } catch (err) {
        handleErrors('Error when trying to leave room', err);
      }
    },
    [handleErrors],
  );

  return (
    <RoomsUsersContext.Provider
      value={{ indexRoomUsers, roomUsers, kickRoomUser, leaveRoom }}
    >
      {children}
    </RoomsUsersContext.Provider>
  );
};

export const useRoomsUsers = (): IRoomsUsersContext => {
  const context = useContext(RoomsUsersContext);
  if (!context) {
    throw new Error('useRoomsUsers must be used within RoomsUsersProvider');
  }
  return context;
};

export default RoomsUsersProvider;
