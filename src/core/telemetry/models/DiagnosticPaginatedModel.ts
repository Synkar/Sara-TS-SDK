export interface IDiagnosticPaginatedModel<T> {
  count: number;
  lastKey: string | null;
  results: T[];
}

export class DiagnosticPaginatedModel<T>
  implements IDiagnosticPaginatedModel<T>
{
  count: number;
  lastKey: string | null;
  results: T[];

  /**
   * Creates a new PaginatedModel instance.
   *
   * @param count - Number of results
   * @param next - Next page
   * @param previous - Previous page
   * @param results - Array of results
   */
  constructor(count: number, lastKey: string | null, results: T[]) {
    this.count = count;
    this.lastKey = lastKey;
    this.results = results;
  }
}

export default DiagnosticPaginatedModel;
