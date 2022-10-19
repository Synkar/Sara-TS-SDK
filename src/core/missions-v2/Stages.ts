import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  StagesCreate,
  StagesListFilters,
  StagesRetrieve,
  StagesUpdate,
} from "./models/Stages.models";

import { Steps as _Steps } from "./Steps";

export class Stages {
  static resource = "missions/stages";
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
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    filters?: StagesListFilters
  ): Promise<PaginatedModel<StagesRetrieve>> => {
    return await Stages.list(filters, this.session);
  };
  retrieve = async (id: string): Promise<StagesRetrieve> => {
    return await get(Stages.resource, id, null, this.session, "v2");
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
  remove = async (id: string): Promise<void> => {
    return await remove(Stages.resource, id, this.session, "v2");
  };

  Steps = function (session?: ISession) {
    return new _Steps(session, this.parent.missionLookup, this.parent.lookup);
  } as any as { new (session?: ISession): _Steps };

  static Steps = _Steps;

  static list = async (
    filters?: StagesListFilters,
    session?: Session
  ): Promise<PaginatedModel<StagesRetrieve>> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Stages.resource, filters, session, "v2");
  };
}
