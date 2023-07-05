import { DatetimeTS } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { PaginatedModel } from "../../../models/PaginatedModel";
import {
  InstanceToolRetrieve,
  ParamValuesCreate,
} from "./InstanceTools.models";

export enum Status {
  PENDING = "PENDING",
  EXECUTING = "EXECUTING",
  PAUSED = "PAUSED",
  SUCCEEDED = "SUCCEEDED",
  PREEMPTED = "PREEMPTED",
  ABORTED = "ABORTED",
  REJECTED = "REJECTED",
  RECALLED = "RECALLED",
}

export declare type ExecutionType = {
  uuid: string;
  status: Status;
  robot: string | null;
  user: string;
};

export declare type ExecutionRetrieve = ExecutionType & {
  instanceTool: Partial<InstanceToolRetrieve>;
  params: ParamValuesCreate;
} & DatetimeTS;

export declare type ExecutionList = PaginatedModel<ExecutionRetrieve>;

export declare type ExecutionCreate = Partial<ExecutionType> & {
  robot?: string;
  params: ParamValuesCreate;
};

export declare type ExecutionUpdate = Partial<ExecutionType>;

export declare type ExecutionFilters = FiltersListType;
