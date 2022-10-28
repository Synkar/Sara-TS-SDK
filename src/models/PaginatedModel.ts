/**
 * Paginated Model Interface
 */
export interface IPaginatedModel<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
}

/**
 * Paginated Model Class
 */
export class PaginatedModel<T> implements IPaginatedModel<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];

  /**
   * Creates a new PaginatedModel instance.
   *
   * @param count - Number of results
   * @param next - Next page
   * @param previous - Previous page
   * @param results - Array of results
   */
  constructor(
    count: number,
    next: number | null,
    previous: number | null,
    results: T[]
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}

export default IPaginatedModel;
