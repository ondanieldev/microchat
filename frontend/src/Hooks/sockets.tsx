import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { backendURL } from 'Services/api';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useAuth } from './auth';
import { useRooms } from './rooms';
import { useMessages } from './messages';

type ISocket = Socket<DefaultEventsMap, DefaultEventsMap> | null;

interface ISocketsContext {
  socket: ISocket;
}

const SocketsContext = createContext<ISocketsContext>({} as ISocketsContext);

export const SocketsProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { indexRoomMessages } = useMessages();
  const { userRooms, currentRoom, indexUserRooms } = useRooms();

  const [socket, setSocket] = useState<ISocket>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const newSocket = io(backendURL, {
      secure: true,
      transports: ['websocket', 'polling'],
      auth: {
        token: user.token,
      },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
    });
    setSocket(newSocket);

    newSocket.connect();
  }, [user]);

  useEffect(() => {
    if (socket) {
      userRooms.forEach(room => {
        socket.emit('room.join', {
          room_id: room.id,
        });
      });
    }
  }, [userRooms, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.off('message');
    socket.on('message', () => {
      if (currentRoom) {
        indexRoomMessages({
          room_id: currentRoom.id,
        });
      }

      indexUserRooms();
    });
  }, [socket, currentRoom, indexRoomMessages, indexUserRooms]);

  return (
    <SocketsContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketsContext.Provider>
  );
};

export const useSockets = (): ISocketsContext => {
  const context = useContext(SocketsContext);
  if (!context) {
    throw new Error('useSockets must be used within SocketsProvider');
  }
  return context;
};

export default SocketsProvider;
