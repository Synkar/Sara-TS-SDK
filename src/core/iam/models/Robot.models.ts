import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { FleetType } from "./Fleet.models";
import { Location } from "./Location.models";
import { RegionType } from "./Region.models";

declare type FleetOnRobot = UUID & FleetType;

export declare type RobotUuid = string;
export declare type RobotType = {
  name: string;
  description?: string;
};

declare type RobotWithFleet = RobotType & {
  fleets?: FleetOnRobot[] | null;
};

declare type RobotLocatity = {
  locality: {
    slug: string;
    name: string;
    description: string;
    region: RegionType;
    location: Location | null;
  };
};

export declare type RobotRetrieve = UUID &
  RobotWithFleet &
  RobotLocatity &
  Datetime;

export declare type RobotClient = {
  uuid: string;
  name: string;
  slug: string;
  aws_cognito_client_id: string;
} & Datetime;

export declare type RobotCreate = RobotType;
export declare type RobotUpdate = Partial<RobotType>;
