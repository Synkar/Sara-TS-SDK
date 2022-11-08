import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type ServicesType = {
  name: string;
  slug: string;
};

export declare type ServiceForActions = UUID & {
  id: number;
  name: string;
  slug: string;
} & Datetime;

export declare type ServicesRetrieve = UUID & ServicesType & Datetime;
export declare type ServicesCreate = ServicesType;
export declare type ServicesUpdate = Partial<ServicesCreate>;
