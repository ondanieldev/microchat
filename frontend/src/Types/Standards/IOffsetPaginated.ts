interface IOffsetPaginated<T> {
  entities: T[];
  total: number;
}

export default IOffsetPaginated;
