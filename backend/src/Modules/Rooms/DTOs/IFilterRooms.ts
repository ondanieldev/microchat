import IOffsetPaginationRequest from 'Shared/DTOs/IOffsetPaginationRequest';
import IFilterRoom from './IFilterRoom';

type IFilterRooms = IFilterRoom & IOffsetPaginationRequest;

export default IFilterRooms;
