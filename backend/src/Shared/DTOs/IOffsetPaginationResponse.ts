interface IOffsetPaginationResponse<T> {
  entities: T[];
  total: number;
}

export default IOffsetPaginationResponse;
