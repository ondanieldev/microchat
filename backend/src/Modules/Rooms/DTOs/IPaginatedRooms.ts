import IOffsetPaginationResponse from 'Shared/DTOs/IOffsetPaginationResponse';
import Room from '../Infra/TypeORM/Entities/Room';

type IPaginatedRooms = IOffsetPaginationResponse<Room>;

export default IPaginatedRooms;
