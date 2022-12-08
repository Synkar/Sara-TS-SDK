import { RobotUuid } from "../../iam/models/Robot.models";
export declare type EventsType = {
  id: string;
  topic: string;
  robot: RobotUuid;
  data: string;
  createdAt: Date | string;
};

export declare type EventsRetrieve = EventsType;
