interface ICursorPaginationResponse<T> {
  entities: T[];
  next_cursor: string | null;
  total: number;
}

export default ICursorPaginationResponse;
