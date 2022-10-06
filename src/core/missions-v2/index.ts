import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch } from "../../utils/rest";
import {
  MissionsCreate,
  MissionsRetrieve,
  MissionsUpdate,
} from "./models/Missions.models";

export class Missions {
  private resource: string = "missions";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session!);
    } else {
      this.session = Client.session;
    }
  }

  list = async (robot_id: string, filters?: any): Promise<any> => {
    if (!filters) filters = {};
    filters["robot_id"] = robot_id;
    return await getAll(this.resource, filters, this.session, "v2");
  };
  retrieve = async (id: string, filters?: any): Promise<MissionsRetrieve> => {
    return await get(this.resource, id, filters, this.session, "v2");
  };
  update = async (
    id: string,
    payload: MissionsUpdate
  ): Promise<MissionsRetrieve> => {
    return await patch(this.resource, id, payload, this.session, "v2");
  };
  create = async (payload: MissionsCreate): Promise<MissionsRetrieve> => {
    return await post(this.resource, payload, this.session, "v2");
  };
}

/*
export * from "./Stages";
export * from "./Steps";
export * from "./Tags";
*/
