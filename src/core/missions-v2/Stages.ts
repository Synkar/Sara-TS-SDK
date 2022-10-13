import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  StagesCreate,
  StagesRetrieve,
  StagesUpdate,
} from "./models/Stages.models";

import { Steps as _Steps } from "./Steps";

export class Stages {
  static resource: string = "missions/stages";
  private missionLookup?: string;
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession, missionLookup?: string) {
    this.lookup = lookup;
    if (missionLookup) {
      Stages.resource = `missions/${missionLookup}/stages`;
    }
    this.Steps.prototype.parent = this;
    this.missionLookup = missionLookup;
    if (session) {
      this.session = new Session(session!);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: any): Promise<any> => {
    console.log("m, s:", this.missionLookup, this.lookup);
    return await Stages.list(filters, this.session);
  };
  retrieve = async (id: string, filters?: any): Promise<StagesRetrieve> => {
    return await get(Stages.resource, id, filters, this.session, "v2");
  };
  update = async (
    id: string,
    payload: StagesUpdate
  ): Promise<StagesRetrieve> => {
    return await patch(Stages.resource, id, payload, this.session, "v2");
  };
  create = async (payload: StagesCreate): Promise<StagesRetrieve> => {
    return await post(Stages.resource, payload, this.session, "v2");
  };
  remove = async (id: string): Promise<any> => {
    return await remove(Stages.resource, id, this.session, "v2");
  };

  Steps = function (session?: ISession) {
    return new _Steps(session, this.parent.missionLookup, this.parent.lookup);
  } as any as { new (session?: ISession): _Steps };

  static Steps = _Steps;

  static list = async (filters?: any, session?: Session): Promise<any> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Stages.resource, filters, session, "v2");
  };
}
