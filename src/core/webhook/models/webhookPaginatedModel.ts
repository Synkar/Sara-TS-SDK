export interface IWebhookPaginatedModel<T> {
  count: number;
  limit: number | null;
  results: T[];
}

export class WebhookPaginatedModel<T> implements IWebhookPaginatedModel<T> {
  count: number;
  limit: number | null;
  results: T[];

  /**
   * Creates a new PaginatedModel instance.
   *
   * @param count - Number of results
   * @param limit - Max amount of results per page
   * @param results - Array of results
   */
  constructor(count: number, limit: number | null, results: T[]) {
    this.count = count;
    this.limit = limit;
    this.results = results;
  }
}

export default IWebhookPaginatedModel;
