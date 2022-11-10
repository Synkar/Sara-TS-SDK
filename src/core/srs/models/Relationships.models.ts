import { UUID } from "../../../models/UUID";
import { BucketsType } from "./Buckets.models";
import { Datetime } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";

export declare type RelationshipsType = {
  local_root: string;
  match_regex: string;
  locality: string;
  bucket: BucketsType;
};

export declare type FilesType = {
  folder: boolean;
  key: string;
  path: string;
  robots: {
    [key: RobotUuid]: {
      status: "ONLY_ROBOT" | "ONLY_BUCKET" | "NO_PLACE" | "UNSYNC" | "SYNC";
      size: number;
      mtime: number;
      hash: string;
    };
  };
};

export declare type RobotUuid = string;

export declare type RelationshipsRetrieve = UUID &
  RelationshipsType & {
    files: FilesType[];
  } & Datetime;

export declare type RelationshipsList = UUID & RelationshipsType & Datetime;
export declare type RelationshipsCreate = RelationshipsType;
export declare type RelationshipsUpdate = Partial<RelationshipsType>;

export declare type RelationshipsListFilters = FiltersListType & {
  locality?: string;
  bucket?: string;
};
