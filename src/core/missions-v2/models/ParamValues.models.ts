import { UUID } from "../../../models/UUID";
import { ParamsType } from "./Params.models";

export declare type ParamValuesType = UUID & {
  param: ParamsType;
  step_value: string;
  param_value: string;
};

export declare type ParamValuesForMission = UUID & {
  param: string;
  step_value: string;
  param_value: string | null;
};

export declare type ParamsForMission = UUID & {
  name: string;
  description: string;
  property: string;
  is_variable: boolean;
  is_metric: boolean;
  value: string;
  value_type: string;
  map_value: Map<string, string | boolean | number> | null;
  metadata: Map<string, string | boolean | number> | null;
};

export declare type ParamsStageCreation = {
  property?: string;
  is_variable?: boolean;
  value?: string;
  is_metric?: boolean;
  map_value?: string;
  description?: string;
  name?: string;
};

export declare type propertiesType = {
  key?: string;
  type?: string;
  group?: string;
  title?: string;
  default?:
    | string
    | boolean
    | {
        type: string;
        properties: {
          [key: string]: propertiesType;
        };
      };
  group_index?: number;
  property?: string;
  description?: string;
  const?: string;
  required?: string[];
};
