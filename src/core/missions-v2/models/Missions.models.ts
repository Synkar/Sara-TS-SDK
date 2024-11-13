import { Datetime } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { UUID } from "../../../models/UUID";
import { StagesForMission, StageForMissionCreate } from "./Stages.models";

export declare type MissionsType = {
  robot: string;
  current_step: number;
  status: number;
  assisted: boolean;
  loop: boolean;
  outcome: number;
  stages: StagesForMission[];
  tags: string[];
  template_key?: string;
  template_value?: string;
};

export declare type MissionsRetrieve = UUID & MissionsType & Datetime;

export declare type MissionsList = UUID & {
  robot: string;
  current_step: number;
  status: number;
  assisted: boolean;
  loop: boolean;
  outcome: number;
  tags: string[];
} & Datetime;
export declare type MissionsCreate = {
  robot: string;
  stages?: StageForMissionCreate[];
  tags?: string[];
  assisted?: boolean;
  loop?: boolean;
  client?: string;
  launcher?: string;
  template_key?: string;
  template_value?: string;
};
export declare type MissionsUpdate = MissionsType;

export declare type MissionsListFilters = FiltersListType & {
  robot_id?: string;
};
