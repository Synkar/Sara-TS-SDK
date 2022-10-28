/**
 * Default Response Model Interface
 */
export interface IResponseModel<T> {
  status: number;
  data: T;
}

/**
 * Default Response Model Class
 */
export class ResponseModel<T> implements IResponseModel<T> {
  status: number;
  data: T;

  /**
   * Creates a new ResponseModel instance.
   *
   * @param status - Response status code
   * @param data - Response data
   */
  constructor(status: number, data: T) {
    this.status = status;
    this.data = data;
  }
}
