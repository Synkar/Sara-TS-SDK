import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll } from "../../utils/rest";
import { DjangoDetail, IamSlugs } from "./models/Iam.models";

import { Robots as _Robots } from "./Robots";
import { Fleets as _Fleets } from "./Fleets";
import { Users as _Users } from "./Users";
import { Policies as _Policies } from "./Policies";
import { Actions as _Actions } from "./Actions";
import { Apps as _Apps } from "./Apps";
import { Clients as _Clients } from "./Clients";
import { Groups as _Groups } from "./Groups";
import { Services as _Services } from "./Services";

export * from "./Robots";
export * from "./Fleets";
export * from "./Users";
export * from "./Policies";
export * from "./Actions";
export * from "./Apps";
export * from "./Clients";
export * from "./Groups";
export * from "./Services";
export * from "../../models/Session";
export class IAM {
  private resource = "iam";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  hasPermission = async (
    action: string,
    scope: number,
    resource?: string
  ): Promise<boolean> => {
    const filters = {
      action,
      scope: String(scope),
      resource,
    };
    const response: DjangoDetail = await getAll(
      `${this.resource}/has-permission`,
      filters,
      this.session
    );
    return response.detail;
  };

  slugs = async (pk: string): Promise<IamSlugs> => {
    return await getAll(`${this.resource}/slugs`, { pk }, this.session);
  };

  Robots = function (session?: ISession) {
    return new _Robots(session);
  } as any as { new (session?: ISession): any };

  Fleets = function (session?: ISession) {
    return new _Fleets(session);
  } as any as { new (session?: ISession): any };

  Users = function (session?: ISession) {
    return new _Users(session);
  } as any as { new (session?: ISession): any };

  Policies = function (session?: ISession) {
    return new _Policies(session);
  } as any as { new (session?: ISession): any };

  Actions = function (session?: ISession) {
    return new _Actions(session);
  } as any as { new (session?: ISession): any };

  Apps = function (session?: ISession) {
    return new _Apps(session);
  } as any as { new (session?: ISession): any };

  Clients = function (session?: ISession) {
    return new _Clients(session);
  } as any as { new (session?: ISession): any };

  Groups = function (session?: ISession) {
    return new _Groups(session);
  } as any as { new (session?: ISession): any };

  Services = function (session?: ISession) {
    return new _Services(session);
  } as any as { new (session?: ISession): any };

  static Robots = _Robots;
  static Fleets = _Fleets;
  static Users = _Users;
  static Policies = _Policies;
  static Actions = _Actions;
  static Apps = _Apps;
  static Clients = _Clients;
  static Groups = _Groups;
  static Services = _Services;
}
