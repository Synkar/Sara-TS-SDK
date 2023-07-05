import { DatetimeTS } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { PaginatedModel } from "../../../models/PaginatedModel";

export declare type GroupType = {
  uuid: string;
  name: string;
  description: string;
  iamAction: string;
};

export declare type GroupRetrieve = GroupType & DatetimeTS;

export declare type GroupList = PaginatedModel<GroupRetrieve>;

export declare type GroupCreate = Partial<GroupType> & {
  name: string;
  iamAction: string;
};

export declare type GroupUpdate = Partial<GroupType>;

export declare type GroupFilters = FiltersListType;
