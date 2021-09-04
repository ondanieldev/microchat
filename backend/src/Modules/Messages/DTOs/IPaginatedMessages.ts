import ICursorPaginationResponse from 'Shared/DTOs/ICursorPaginationResponse';
import Message from '../Infra/TypeORM/Entities/Message';

type IPaginatedMessages = ICursorPaginationResponse<Message>;

export default IPaginatedMessages;
