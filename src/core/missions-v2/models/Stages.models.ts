import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import {
  StepsForStagesCreation,
  StepsRetrieveForMission,
} from "./Steps.models";
import { ParamValuesForMission, ParamValuesType } from "./ParamValues.models";
import { FiltersListType } from "../../../models/Filters";

export declare type StagesType = {
  name: string;
  description: string;
  active?: boolean;
};

export declare type StagesForMission = UUID &
  StagesType & {
    steps: StepsRetrieveForMission[];
    stage_position: number;
    init_step: number;
    end_step: number;
    param_values: ParamValuesForMission[];
  } & Datetime;
export declare type StagesRetrieve = UUID &
  StagesType & {
    steps: StepsRetrieveForMission[];
  } & Datetime;
export declare type StagesUpdate = StagesType & {
  steps: StepsForStagesCreation[];
};
export declare type StagesCreate = StagesType & {
  steps: StepsForStagesCreation[];
};

export declare type StagesListFilters = FiltersListType;
