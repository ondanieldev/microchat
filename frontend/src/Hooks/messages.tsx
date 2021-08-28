import React, { createContext, useCallback, useContext, useState } from 'react';

import api from 'Services/api';
import IFIlterMessages from 'Types/DTOs/IFIlterMessages';
import ISendMessage from 'Types/DTOs/ISendMessage';
import IMessage from 'Types/Entities/IMessage';
import ICursorPaginated from 'Types/Standards/ICursorPaginated';
import IDefaultRequest from 'Types/Standards/IDefaultRequest';
import { useErrors } from './errors';

interface IMessagesContext {
  roomMessages: ICursorPaginated<IMessage> | null;
  indexRoomMessages(data: IFIlterMessages): Promise<void>;
  sendMessage(data: ISendMessage & IDefaultRequest): Promise<void>;
}

const MessagesContext = createContext<IMessagesContext>({} as IMessagesContext);

const MessagesProvider: React.FC = ({ children }) => {
  const { handleErrors } = useErrors();

  const [roomMessages, setRoomMessages] =
    useState<ICursorPaginated<IMessage> | null>(null);

  const indexRoomMessages = useCallback(
    async ({ room_id, ...data }: IFIlterMessages) => {
      try {
        const response = await api.get(`/messages/${room_id}`, {
          params: {
            limit: 25,
            ...data,
          },
        });

        const { entities } = response.data;
        entities.reverse();

        setRoomMessages({
          entities,
          total: response.data.total,
          next_cursor: response.data.next_cursor,
        });
      } catch (err) {
        handleErrors('Error when trying to index messages', err);
      }
    },
    [handleErrors],
  );

  const sendMessage = useCallback(
    async ({ formRef, ...data }: ISendMessage & IDefaultRequest) => {
      try {
        if (!data.content) {
          return;
        }
        await api.post('/messages', data);
        formRef.current?.reset();
      } catch (err) {
        handleErrors('Error when trying to send message', err);
      }
    },
    [handleErrors],
  );

  return (
    <MessagesContext.Provider
      value={{
        roomMessages,
        indexRoomMessages,
        sendMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = (): IMessagesContext => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within MessagesProvider');
  }
  return context;
};

export default MessagesProvider;
