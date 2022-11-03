import { Datetime } from "../../../models/Datetimes";

export declare type ClientType = {
  name: string;
  slug: string;
  aws_cognito_client_id: string;
} & Datetime;
