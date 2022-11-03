import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll } from "../../utils/rest";
import { DjangoDetail, IamSlugs } from "./models/Iam.models";

import { Robots as _Robots } from "./Robots";
import { Fleets as _Fleets } from "./Fleets";

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

  static Robots = _Robots;
  static Fleets = _Fleets;
}
