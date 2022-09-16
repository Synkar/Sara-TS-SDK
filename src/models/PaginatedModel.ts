export interface IPaginatedModel {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<any>;
}

export default IPaginatedModel;
