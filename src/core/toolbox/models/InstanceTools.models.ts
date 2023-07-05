import { DatetimeTS } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { PaginatedModel } from "../../../models/PaginatedModel";
import { GroupRetrieve } from "./Groups.models";
import { ParamKey, ToolRetrieve } from "./Tools.models";

export declare type ParamValuesCreate = {
  [key: string]: string | number | boolean;
};

export declare type ParamValueRetrieve = {
  value: string;
  isVariable: boolean;
  paramKey: ParamKey;
};

export declare type InstanceToolType = {
  uuid: string;
  name: string;
  description: string;
  iamAction: string;
};

export declare type InstanceToolRetrieve = InstanceToolType & {
  paramValues: ParamValueRetrieve[];
  tool?: Partial<ToolRetrieve>;
  group?: Partial<GroupRetrieve>;
} & DatetimeTS;

export declare type InstanceToolList = PaginatedModel<InstanceToolRetrieve>;

export declare type InstanceToolCreate = Partial<InstanceToolType> & {
  name: string;
  iamAction: string;
  params: ParamValuesCreate;
  group: string;
};

export declare type InstanceToolUpdate = Partial<InstanceToolType>;

export declare type InstanceToolFilters = FiltersListType;
