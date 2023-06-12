import { Client } from "../..";
import { ISession, Session } from "../../models/Session";

import { Activities as _Activities } from "./Activities";
import { Relationships as _Relationships } from "./Relationships";
import { Buckets as _Buckets } from "./Buckets";

export * from "./Activities";
export * from "./Buckets";
export class SRS {
  private resource = "srs";
  private session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  Buckets = function (lookup?: string, session?: ISession) {
    return new _Buckets(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): _Buckets };

  Activities = function (lookup?: string, session?: ISession) {
    return new _Activities(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): _Activities };

  Relationships = function (lookup?: string, session?: ISession) {
    return new _Relationships(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): _Relationships };

  static Buckets = _Buckets;
  static Activities = _Activities;
  static Relationships = _Relationships;
}
