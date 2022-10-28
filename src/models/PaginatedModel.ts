/**
 * Paginated Model Interface
 */
export interface IPaginatedModel {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<any>;
}

/**
 * Paginated Model Class
 */
export class PaginatedModel implements IPaginatedModel {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<any>;

  /**
   * Creates a new PaginatedModel instance.
   *
   * @param count - Number of results
   * @param next - Next page
   * @param previous - Previous page
   * @param results - Array of results
   */
  constructor(
    count: Number,
    next: Number,
    previous: Number,
    results: Array<any>
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}

export default IPaginatedModel;
