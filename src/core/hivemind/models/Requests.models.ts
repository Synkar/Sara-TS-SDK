export declare type RequestsType = {
  uuid: string;
  status: string;
  locality: string;
  operation: {
    uuid: string;
    name: string;
  };
  nodes: {
    pickup: {
      lowerTimeWindow: number;
      upperTimeWindow: number;
      params: {
        [key: string]: string;
      };
    };
    delivery: {
      lowerTimeWindow: number;
      upperTimeWindow: number;
      params: {
        [key: string]: string;
      };
    };
  };
  createdAt: string;
};

export declare type RequestsRetrieve = RequestsType;

export declare type RequestsList = {
  uuid: string;
  status: string;
  operation: {
    uuid: string;
    name: string;
  };
  createdAt: string;
};

export declare type RequestsCreate = {
  operation: string;
  pickup: {
    params: {
      [key: string]: string | number | boolean;
    };
    windowTime: [number, number];
  };
  delivery: {
    params: {
      [key: string]: string | number | boolean;
    };
    windowTime: [number, number];
  };
};
