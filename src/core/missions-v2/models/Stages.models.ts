import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { StepsRetrieve } from "./Steps.models";
import { ParamValuesType } from "./ParamValues.models";

export declare type StagesType = {
  name: string;
  description: string;
  stage_position: number;
  init_step: number;
  end_step: number;
  steps: StepsRetrieve[];
  param_values: ParamValuesType[];
};

export declare type StagesRetrieve = UUID & StagesType & Datetime;
export declare type StagesUpdate = StagesType;
export declare type StagesCreate = StagesType;
