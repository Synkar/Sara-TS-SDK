import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll, get, patch, post, remove } from "../../utils/rest";
import { RetrieveRobot, RobotType } from "./models/Robot.models";

export class Robots {
  private resource = "iam/robots";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (): Promise<RetrieveRobot[]> => {
    return await getAll(this.resource, null, this.session);
  };

  retrieve = async (id: string): Promise<RetrieveRobot> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: any): Promise<RetrieveRobot> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (id: string, payload: any): Promise<RetrieveRobot> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<void> => {
    return await remove(this.resource, id, this.session);
  };
}
