import { Client, Localities } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll } from "../../utils/rest";

import { Localities as _Localities } from "./Localities";
import { Operations, Operations as _Operations } from "./Operations";
import { Requests, Requests as _Requests } from "./Requests";

export * as HLocalities from "./Localities";
export * from "./Operations";
export * from "./Requests";
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

  Localities = function (session?: ISession) {
    return new _Localities(session);
  } as any as { new (session?: ISession): Localities };

  Operations = function (session?: ISession) {
    return new _Operations(session);
  } as any as { new (session?: ISession): Operations };

  Requests = function (session?: ISession) {
    return new _Requests(session);
  } as any as { new (session?: ISession): Requests };

  static Localities = _Localities;
  static Operations = _Operations;
  static Requests = _Requests;
}
