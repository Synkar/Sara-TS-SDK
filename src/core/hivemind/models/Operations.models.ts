import { DatetimeTS } from "../../../models/Datetimes";
import { LocalityRetrieve } from "./Localities.models";

export declare type OperationsType = {
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

export declare type OperationsCreate = Partial<OperationsType> & {
  name: string;
  uuid?: string;
  locality: string;
};

export declare type OperationsRetrieve = OperationsType & {
  locality: LocalityRetrieve;
  localitySlug: string;
} & DatetimeTS & {
    requestBody: RequestBody;
  };

export declare type OperationsCreateResponse = OperationsType & {
  localitySlug: string;
} & DatetimeTS;

export declare type OperationList = {
  uuid: string;
  name: string;
  description: string;
  localitySlug: string;
} & DatetimeTS;

export declare type OperationsUpdate = Partial<OperationsType> & {
  locality: string;
};

export declare type OperationRequestBodyRetrieve = RequestBody;
