import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { ParamsType } from "./Params.models";

export declare type ParamValuesType = UUID & {
  param: ParamsType;
  step_value: string;
  param_value: string;
};
