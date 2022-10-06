import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

//TODO: finishing creating tag models

export declare type TagsType = {
  name: string;
  description: string;
};

export declare type TagsRetrieve = UUID & TagsType & Datetime;
export declare type TagsCreate = TagsType;
export declare type TagsUpdate = TagsType;
