import { Datetime } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { UUID } from "../../../models/UUID";
import { StagesForMission } from "./Stages.models";

export declare type MissionsType = {
  robot: string;
  current_step: number;
  status: number;
  assisted: boolean;
  loop: boolean;
  outcome: number;
  stages: StagesForMission[];
  tags: string[];
};

export declare type MissionsRetrieve = UUID & MissionsType & Datetime;
export declare type MissionsCreate = MissionsType;
export declare type MissionsUpdate = MissionsType;

export declare type MissionsListFilters = FiltersListType & {
  robot_id?: string;
};
