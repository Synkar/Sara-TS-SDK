import { DatetimeTS } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { PaginatedModel } from "../../../models/PaginatedModel";

export enum ParamType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
}

export declare type ParamKey = {
  name: string;
  type: ParamType;
};

export declare type ToolType = {
  uuid: string;
  name: string;
  description: string;
  scriptUrl: string;
  paramKeys: ParamKey[];
};

export declare type ToolRetrieve = ToolType & DatetimeTS;

export declare type ToolList = PaginatedModel<ToolRetrieve>;

export declare type ToolCreate = Partial<ToolType> & {
  name: string;
  scriptUrl: string;
  paramKeys: ParamKey[];
};

export declare type ToolUpdate = Partial<ToolType>;

export declare type ToolFilters = FiltersListType;
