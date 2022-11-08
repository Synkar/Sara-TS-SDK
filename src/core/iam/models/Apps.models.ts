import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { DateTimeUser, UsersType } from "./Users.models";

export declare type AppsType = {
  name: string;
  description: string;
};

export declare type AppsRetrieve = UUID &
  AppsType & {
    id: number;
    user: UUID & UsersType & DateTimeUser;
    user_client_id: string;
  } & Datetime;

export declare type AppsCreate = AppsType;
export declare type AppsUpdate = Partial<AppsCreate>;
