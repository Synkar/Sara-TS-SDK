import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { ClientType } from "./Client.models";
import { RobotType } from "./Robot.models";

export declare type FleetType = {
  name: string;
  description?: string;
};

export declare type FleetRetrieve = UUID &
  FleetType &
  Datetime & {
    client: ClientType;
    robots?: [UUID & RobotType & Datetime];
  };

export declare type FleetCreate = FleetType;
export declare type FleetUpdate = Partial<FleetType>;
