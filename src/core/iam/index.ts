import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll } from "../../utils/rest";
import { IamDetail, IamSlugs } from "./models/Iam.models";
import { Robots as _Robots } from "./Robots";

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
    const response: IamDetail = await getAll(
      `${this.resource}/has-permission`,
      filters,
      this.session
    );
    return response.detail;
  };

  slugs = async (pk: string): Promise<IamSlugs> => {
    return await getAll(`${this.resource}/slugs`, { pk }, this.session);
  };

  static Robots = _Robots;
}
