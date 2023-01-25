import { Datetime } from "../../../models/Datetimes";
import { Location } from "./Location.models";
import { RegionType } from "./Region.models";

export declare type LocalityType = {
  slug: string;
  name: string;
  description: string;
  region: RegionType;
  location: Location;
};

export declare type LocalityRetrieve = LocalityType & Datetime;

export declare type LocalityCreate = LocalityType;
export declare type LocalityUpdate = Partial<LocalityType>;
