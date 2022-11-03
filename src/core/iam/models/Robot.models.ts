import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { FleetType } from "./Fleet.models";

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
