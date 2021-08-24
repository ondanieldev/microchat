import IMessage from './IMessage';

interface IRoom {
  id: string;
  name: string;
  moderator_id: string;
  created_at: Date;
  updated_at: Date;
  last_message?: IMessage;
}

export default IRoom;
