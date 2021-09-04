interface ICursorPaginated<T> {
  entities: T[];
  next_cursor?: string;
  total: number;
}

export default ICursorPaginated;
