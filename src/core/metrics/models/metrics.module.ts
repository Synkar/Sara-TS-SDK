import { Datetime } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { UUID } from "../../../models/UUID";

export declare type MetricsType = {
  measurement: string;
  range: string;
  filters?: MetricsFilters;
  options?: MetricsOptions;
  groups?: string[];
};

export declare type MetricsFilters = {
  robot_id?: string;
  assisted?: boolean;
};
export declare type MetricsOptions = {
  window?: string;
  function?: string;
  empty?: boolean;
};
