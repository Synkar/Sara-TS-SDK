import { Datetime } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { UUID } from "../../../models/UUID";
import {
  ParamsForMission,
  ParamsStageCreation,
  propertiesType,
} from "./ParamValues.models";

export declare type StepsType = {
  name: string;
  description: string;
  robot_type: string;
  active: boolean;
  step_position?: number;
};

export declare type StepsForStagesCreation = UUID & {
  params: ParamsStageCreation[];
};

export declare type StepsList = UUID & StepsType & Datetime;

export declare type StepsRetrieve = UUID & {
  name: string;
  robot_type: string;
  properties: propertiesType[];
  json_schema: jsonSchemaType;
  description: string;
  metadata?: Map<string, string | boolean | number> | null;
  active: boolean;
} & Datetime;
export declare type StepsRetrieveForMission = UUID &
  StepsType & {
    params: ParamsForMission[];
  } & Datetime;
export declare type StepsRetrieveForStages = UUID & StepsType;
export declare type StepsCreate = StepsType;
export declare type StepsUpdate = StepsType;

export declare type StepsListFilters = FiltersListType;

export declare type jsonSchemaType = {
  type: string;
  properties: {
    [key: string]: propertiesType &
      {
        properties: {
          [key: string]: propertiesType;
        };
        additionalProperties: boolean;
      }[];
  };
};

export declare type StepsForMission = UUID &
  StepsType & {
    step_position: number;
    init_step: number;
    end_step: number;
    params: ParamsStageCreation[];
  };
