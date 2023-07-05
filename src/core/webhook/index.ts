import { Client } from "../..";
import { ISession, Session } from "../../models/Session";

import { Endpoints as _Endpoints } from "./Endpoints";
import { Topics as _Topics } from "./Topics";
import { EventsExecutions as _EventsExecutions } from "./EventsExecutions";
import { Events as _Events } from "./Events";

export * from "./Endpoints";
export * from "./Topics";

export class Webhooks {
  private resource = "webhook";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  Endpoints = function (session?: ISession) {
    return new _Endpoints(session);
  } as any as { new (session?: ISession): _Endpoints };

  Topics = function (session?: ISession) {
    return new _Topics(session);
  } as any as { new (session?: ISession): _Topics };

  Events_executions = function (session?: ISession) {
    return new _EventsExecutions(session);
  } as any as { new (session?: ISession): _EventsExecutions };

  Events = function (session?: ISession) {
    return new _Events(session);
  } as any as { new (session?: ISession): _Events };

  static Endpoints = _Endpoints;
  static Topics = _Topics;
  static Events_executions = _EventsExecutions;
  static Events = _Events;
}
