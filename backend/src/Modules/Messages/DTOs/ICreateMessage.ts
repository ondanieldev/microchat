import IMessageType from './IMessageType';

interface ICreateMessage {
  content: string;
  room_id: string;
  user_id: string;
  type: IMessageType;
}

export default ICreateMessage;
