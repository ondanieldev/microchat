import IRoom from './IRoom';
import IUser from './IUser';

interface IRoomUser {
  id: string;
  user_id: string;
  room_id: string;
  created_at: Date;
  updated_at: Date;
  user?: IUser;
  room?: IRoom;
}

export default IRoomUser;
