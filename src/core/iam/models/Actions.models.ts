import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";
import { ServiceForActions } from "./Services.models";

export declare type ActionType = {
  service: string;
  name: string;
  type: string;
};

export declare type ActionsForPolicies = UUID & {
  name: string;
  type: string;
  is_super_user: boolean;
  service: ServiceForActions;
};

export declare type ActionRetrieve = UUID & ActionType & Datetime;
export declare type ActionCreate = ActionType;
export declare type ActionUpdate = Partial<ActionCreate>;
