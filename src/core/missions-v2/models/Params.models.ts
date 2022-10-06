import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type ParamsType = UUID & {
  name: string;
  description: string;
  property: string;
  is_variable: boolean;
  is_metric: boolean;
  value?: string;
  value_type: string;
  map_value?: string;
  metadata?: string;
} & Datetime;
