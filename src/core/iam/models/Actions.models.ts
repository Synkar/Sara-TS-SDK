import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type ActionType = {
  service: string;
  name: string;
  type: string;
};

export declare type ActionRetrieve = UUID & ActionType & Datetime;
export declare type ActionCreate = ActionType;
export declare type ActionUpdate = Partial<ActionCreate>;
