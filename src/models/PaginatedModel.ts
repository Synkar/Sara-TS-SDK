export interface IPaginatedModel {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<any>;
}

export class PaginatedModel implements IPaginatedModel {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<any>;

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
