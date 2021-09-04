import IUser from './IUser';

interface IMessage {
  id: string;
  content: string;
  user_id: string;
  room_id: string;
  type: string;
  created_at: Date;
  updated_at: Date;

  user?: IUser;
}

export default IMessage;
