import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { StagesRetrieve } from "./Stages.models";

export declare type MissionsType = {
  robot: string;
  current_step: number;
  status: number;
  assisted: boolean;
  loop: boolean;
  outcome: number;
  stages: StagesRetrieve[];
  tags: string[];
};

export declare type MissionsRetrieve = UUID & MissionsType & Datetime;
export declare type MissionsCreate = MissionsType;
export declare type MissionsUpdate = MissionsType;

export declare type MissionsListFilters = {
  page?: number;
  limit?: number;
  robot_id?: string;
};
