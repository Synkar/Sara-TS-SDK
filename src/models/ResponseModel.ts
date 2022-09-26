export interface IResponseModel {
  status: number;
  data: any;
}

export class ResponseModel implements IResponseModel {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    this.status = status;
    this.data = data;
  }
}
