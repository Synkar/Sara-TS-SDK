import { UUID } from "../../../models/UUID";
import { ClientForUsers, ClientType } from "./Client.models";
import { GroupsForUsers } from "./Groups.models";

declare type DateTimeUser = {
  last_login: string;
  datetime_joined: string;
  datetime_updated: string;
};

export declare type UsersType = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
};

export declare type UsersWithGroupsAndClients = UsersType & {
  groups: GroupsForUsers[];
  clients: ClientForUsers[];
} & DateTimeUser;

export declare type UsersRetrieve = UUID & UsersWithGroupsAndClients;

export declare type UsersCreate = UsersType;

export declare type UsersUpdate = Partial<UsersType>;

export declare type UsersMeResponse = UsersRetrieve & {
  client: ClientType;
} & DateTimeUser;
