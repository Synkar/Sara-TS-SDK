import { MissionsListFilters } from "../core/missions-v2/models/Missions.models";

export declare type FiltersListType = {
  name?: string;
  page?: string;
  limit?: string;
};

export declare type FiltersListTypeAll = FiltersListType | MissionsListFilters;
