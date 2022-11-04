import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type GroupsType = {
  name: string;
};

export declare type GroupsRetrieve = UUID & GroupsType & Datetime;
