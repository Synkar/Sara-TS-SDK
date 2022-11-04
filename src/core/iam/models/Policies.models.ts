import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { ActionsForPolicies } from "./Actions.models";

export declare type PoliciesType = {
  name: string;
  scope: number;
  resource: string;
  client: string;
  super_policy?: boolean;
};

export declare type PoliciesList = UUID & PoliciesType & Datetime;
export declare type PoliciesRetrieve = UUID &
  PoliciesType & {
    editable?: boolean;
    deletable?: boolean;
    permissions: ActionsForPolicies[];
  } & Datetime;

export declare type PoliciesCreate = PoliciesType;
export declare type PoliciesUpdate = Partial<PoliciesCreate>;
