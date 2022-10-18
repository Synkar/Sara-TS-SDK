import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { StepsRetrieve } from "./Steps.models";
import { ParamValuesType } from "./ParamValues.models";
import { FiltersListType } from "../../../models/Filters";

export declare type StagesType = {
  name: string;
  description: string;
  steps: StepsRetrieve[];
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
export declare type StagesUpdate = StagesType;
export declare type StagesCreate = StagesType;

export declare type StagesListFilters = FiltersListType;
