import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { FleetType } from "./Fleet";

declare type FleetOnRobot = UUID & FleetType;

export declare type RobotType = {
  name: string;
  description?: string;
};

declare type RobotWithFleet = RobotType & {
  fleets?: FleetOnRobot[];
};

export declare type RetrieveRobot = UUID & RobotWithFleet & Datetime;
export declare type CreateRobot = RobotType;
export declare type UpdateRobot = RobotType;

export interface IRobot {
  retrieve: (uuid: string) => Promise<RetrieveRobot>;
  create: (robot: CreateRobot) => Promise<RetrieveRobot>;
  update: (uuid: string, robot: UpdateRobot) => Promise<RetrieveRobot>;
  delete: (uuid: string) => Promise<RetrieveRobot>;
  list: () => Promise<RetrieveRobot[]>;
}
