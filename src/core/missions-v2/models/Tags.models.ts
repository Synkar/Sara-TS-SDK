import { FiltersListType } from "../../../models/Filters";
import { UUID } from "../../../models/UUID";

//TODO: finishing creating tag models

export declare type TagsType = {
  name: string;
  group: string;
  datetime_created: Date | string;
  datetime_used: Date | string;
};

export declare type TagsRetrieve = UUID & TagsType;
export declare type TagsCreate = TagsType;
export declare type TagsUpdate = TagsType;

export declare type TagsListFilters = FiltersListType;
