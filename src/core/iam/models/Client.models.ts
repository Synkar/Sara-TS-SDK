import { Datetime } from "../../../models/Datetimes";
import { UUID } from "../../../models/UUID";

export declare type ClientType = {
  name: string;
  slug: string;
  aws_cognito_client_id: string;
} & Datetime;

export declare type ClientForUsers = UUID & {
  name: string;
  slug: string;
};
