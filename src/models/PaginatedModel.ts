/**
 * Paginated Model Interface
 */
export interface IPaginatedModel {
  count: number;
  next: number;
  previous: number;
  results: any[];
}

/**
 * Paginated Model Class
 */
export class PaginatedModel implements IPaginatedModel {
  count: number;
  next: number;
  previous: number;
  results: any[];

  /**
   * Creates a new PaginatedModel instance.
   *
   * @param count - Number of results
   * @param next - Next page
   * @param previous - Previous page
   * @param results - Array of results
   */
  constructor(count: number, next: number, previous: number, results: any[]) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}

export default IPaginatedModel;
