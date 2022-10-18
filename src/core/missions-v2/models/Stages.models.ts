import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import {
  StepsForStagesCreation,
  StepsRetrieveForMission,
} from "./Steps.models";
import { ParamValuesType } from "./ParamValues.models";
import { FiltersListType } from "../../../models/Filters";

export declare type StagesType = {
  name: string;
  description: string;
  steps: StepsRetrieveForMission[];
  active?: boolean;
};

export declare type StagesForMission = UUID &
  StagesType & {
    stage_position: number;
    init_step: number;
    end_step: number;
    param_values: ParamValuesType[];
  };
export declare type StagesRetrieve = UUID & StagesType & Datetime;
export declare type StagesUpdate = StagesType & {
  steps: StepsForStagesCreation[];
};
export declare type StagesCreate = StagesType & {
  steps: StepsForStagesCreation[];
};

export declare type StagesListFilters = FiltersListType;
