import { Datetime } from "../../../models/Datetimes";
import { FiltersListType } from "../../../models/Filters";
import { UUID } from "../../../models/UUID";

export declare type BucketsType = {
  name: string;
  description?: string;
  type: "PUBLIC" | "PRIVATE" | "PROTECTED";
  locality?: string;
  s3_bucket_name?: string;
};

export declare type BucketsRetrieve = UUID &
  BucketsType & {
    owner_client: boolean;
    all_clients_permitted?: boolean;
    clients_permitted?: {
      client: string;
      type: "PROTECTED" | "PUBLIC";
    }[];
    objects: {
      Key: string;
      LastModified: string;
      ETag: string;
      Size: number;
      StorageClass:
        | "STANDARD"
        | "REDUCED_REDUNDANCY"
        | "STANDARD_IA"
        | "ONEZONE_IA"
        | "INTELLIGENT_TIERING"
        | "GLACIER"
        | "DEEP_ARCHIVE"
        | "OUTPOSTS"
        | "GLACIER_IR";
    }[];
  } & Datetime;

export declare type BucketsList = UUID &
  BucketsType & { owner_client: boolean } & Datetime;

export declare type BucketsCreate = BucketsType & {
  all_clients_permitted: boolean;
  clients_permitted?: {
    client: string;
    type: "PROTECTED" | "PUBLIC";
  }[];
};
export declare type BucketsUpdate = Partial<BucketsCreate>;

export declare type BucketsListFilters = FiltersListType & {
  name?: string;
  locality?: string;
};

export declare type BucketDownload = string;
