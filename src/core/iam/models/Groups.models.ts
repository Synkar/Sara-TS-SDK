import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { ClientForGroups } from "./Client.models";
import { PoliciesList } from "./Policies.models";

export declare type GroupsType = {
  name: string;
  description: string;
  deletable: boolean;
  super_group: boolean;
};

export declare type GroupsForUsers = UUID & {
  name: string;
} & Datetime;

export declare type GroupsList = UUID & GroupsType & Datetime;

export declare type GroupsRetrieve = UUID &
  GroupsType & {
    client: ClientForGroups;
    policies: PoliciesList[];
  } & Datetime;

export declare type GroupsCreate = GroupsType;
export declare type GroupsUpdate = Partial<GroupsType>;
