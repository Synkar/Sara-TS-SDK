import { Datetime } from "../../../models/Datetimes";
import { Location } from "./Location.models";
import { RegionType } from "./Region.models";

export declare type LocalityRetrieve = {
  slug: string;
  name: string;
  description: string;
  region: RegionType;
  location: Location;
} & Datetime;
