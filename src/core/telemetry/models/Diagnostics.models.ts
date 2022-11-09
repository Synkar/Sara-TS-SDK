import { JSONValue } from "../../../models/JSON";

export declare type DiagnosticsType = {
  createdAt: string;
  robot: string;
  data: {
    [key: string]: {
      [key: string]: JSONValue | null;
    };
  };
};
