import { Client } from "../..";
import { ISession, Session } from "../../models/Session";

import { Localities as _Localities } from "./Localities";
import { Operations as _Operations } from "./Operations";
import { Requests as _Requests } from "./Requests";

export * as HLocalities from "./Localities";
export * from "./Operations";
export * from "./Requests";
export * from "./Landmarks";
export class Hivemind {
  private resource = "hivemind";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  Localities = function (lookup?: string, session?: ISession) {
    return new _Localities(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): _Localities };

  Operations = function (session?: ISession) {
    return new _Operations(session);
  } as any as { new (session?: ISession): _Operations };

  Requests = function (session?: ISession) {
    return new _Requests(session);
  } as any as { new (session?: ISession): _Requests };

  static Localities = _Localities;
  static Operations = _Operations;
  static Requests = _Requests;
}
