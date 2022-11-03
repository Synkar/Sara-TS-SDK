import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { ClientType } from "./Client.models";
import { RobotType } from "./Robot.models";

export declare type FleetType = {
  name: string;
  description?: string;
};

export declare type RetrieveFleet = UUID &
  FleetType &
  Datetime & {
    client: ClientType;
    robots: [UUID & RobotType & Datetime];
  };

export declare type CreateFleet = FleetType;
export declare type UpdateFleet = FleetType;

export interface IFleet {
  retrieve: (uuid: string) => Promise<RetrieveFleet>;
  create: (fleet: CreateFleet) => Promise<RetrieveFleet>;
  update: (uuid: string, fleet: UpdateFleet) => Promise<RetrieveFleet>;
  delete: (uuid: string) => Promise<RetrieveFleet>;
  list: () => Promise<RetrieveFleet[]>;
}
