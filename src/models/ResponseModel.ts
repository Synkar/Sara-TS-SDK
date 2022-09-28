/**
 * Default Response Model Interface
 */
export interface IResponseModel {
  status: number;
  data: any;
}

/**
 * Default Response Model Class
 */
export class ResponseModel implements IResponseModel {
  status: number;
  data: any;

  /**
   * Creates a new ResponseModel instance.
   *
   * @param status - Response status code
   * @param data - Response data
   */
  constructor(status: number, data: any) {
    this.status = status;
    this.data = data;
  }
}
