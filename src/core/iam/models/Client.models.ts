import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { DateTimeUser, UsersType } from "./Users.models";

export declare type ClientType = {
  name: string;
  slug: string;
  aws_cognito_client_id: string;
};

export declare type ClientForUsers = UUID & {
  name: string;
  slug: string;
};

export declare type ClientForGroups = UUID & {
  name: string;
};

export declare type ClientsRetrieve = UUID &
  ClientType & {
    owner?: UUID & UsersType & DateTimeUser;
  } & Datetime;

export declare type ClientsCreate = ClientType;
export declare type ClientsUpdate = Partial<ClientsCreate>;
