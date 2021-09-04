interface ICursorPaginationRequest {
  cursor?: string | Date | number;
  limit?: number;
}

export default ICursorPaginationRequest;
