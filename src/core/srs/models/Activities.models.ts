import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type ActivitiesType = {
  relationship: RelationshipUuid;
  type: "U" | "D" | "E";
  robots: RobotUuid[];
  files: string[];
};

export declare type RelationshipUuid = string;
export declare type RobotUuid = string;
export declare type filesPath = string;

export declare type ActivitiesList = UUID & ActivitiesType & Datetime;
export declare type ActivitiesRetrieve = UUID &
  ActivitiesType & {
    executions: {
      [key: RobotUuid]: {
        status: string;
        detail: {
          [key: filesPath]: string;
        };
        queuedAt: string;
        startedAt: string;
        lastUpdatedAt: string;
        versionNumber: number;
        executionNumber: number;
      };
    };
  } & Datetime;

export declare type ActivitiesCreate = {
  robot: RobotUuid;
  operation: "DownloadFile" | "UploadFile" | "ExecuteFile";
  payload: string;
};
