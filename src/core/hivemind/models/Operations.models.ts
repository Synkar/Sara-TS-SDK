import { DatetimeTS } from "../../../models/Datetimes";
import { HLocalityRetrieve } from "./Localities.models";

export declare type OperationType = {
  uuid: string;
  name: string;
  description: string;
  pickupMissionStage: string;
  deliveryMissionStage: string;
  pickupMissionStageLandmarkKey: string;
  deliveryMissionStageLandmarkKey: string;
  client?: string;
};

export declare type RequestBody = {
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

export declare type OperationCreate = Partial<OperationType> & {
  name: string;
  uuid?: string;
  locality: string;
};

export declare type OperationRetrieve = OperationType & {
  locality: HLocalityRetrieve;
  localitySlug: string;
} & DatetimeTS & {
    requestBody: RequestBody;
  };

export declare type OperationCreateResponse = OperationType & {
  localitySlug: string;
} & DatetimeTS;

export declare type OperationList = {
  uuid: string;
  name: string;
  description: string;
  localitySlug: string;
} & DatetimeTS;

export declare type OperationUpdate = Partial<OperationType> & {
  locality: string;
};

export declare type OperationRequestBodyRetrieve = RequestBody;
