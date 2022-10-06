import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type StepsType = {
  name: string;
  description: string;
  robot_type: string;
  active: boolean;
  step_position: number;
};

export declare type StepsRetrieve = UUID & StepsType & Datetime;
export declare type StepsCreate = StepsType;
export declare type StepsUpdate = StepsType;
