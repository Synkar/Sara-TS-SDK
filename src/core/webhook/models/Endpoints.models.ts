import { Dates } from "./Dates.models";
import { RobotUuid } from "../../iam/models/Robot.models";

export declare type EndpointsType = {
  client: string;
  id: string;
  url: string;
};

export declare type RelationsType = {
  createdAt: Date | string;
  id: string;
  topic: string;
  endpoint: EndpointUuid;
  robot: RobotUuid;
};
export declare type EndpointUuid = string;

export declare type EndpointsRetrieve = EndpointsType & {
  secretKey: string;
} & Dates;

export declare type EndpointsList = EndpointsType & Dates;

export declare type EndpointsCreate = {
  url: string;
};

export declare type EndpointsUpdate = Partial<EndpointsCreate>;

export declare type RelationsList = RelationsType;

export declare type RelationsCreate = {
  robots: RobotUuid[];
  topics: string[];
};
