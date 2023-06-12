import { MissionsListFilters } from "../core/missions-v2/models/Missions.models";

export declare type FiltersListType = {
  name?: string;
  page?: string;
  limit?: string;
};

export declare type FiltersGeneric = {
  [key: string]: string;
};

export declare type FiltersListTypeAll =
  | FiltersListType
  | MissionsListFilters
  | FiltersGeneric;

export declare type FiltersListSlugType = {
  slug?: string;
  page?: string;
  limit?: string;
};
