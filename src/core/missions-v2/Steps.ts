import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  StepsRetrieve,
  StepsCreate,
  StepsUpdate,
  StepsListFilters,
} from "./models/Steps.models";
export class Steps {
  static resource = "missions/steps";
  private missionLookup: string | undefined;
  private stageLookup: string | undefined;

  session: Session;

  constructor(
    session?: ISession,
    missionLookup?: string,
    stageLookup?: string
  ) {
    this.missionLookup = missionLookup;
    this.stageLookup = stageLookup;
    Steps.resource = `missions/${missionLookup ? missionLookup + "/" : ""}${
      stageLookup ? "stages/" + stageLookup + "/" : ""
    }steps`;
    if (session) {
      this.session = new Session(session!);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: StepsListFilters): Promise<PaginatedModel> => {
    console.log("m, s:", this.missionLookup, this.stageLookup);
    return await Steps.list(filters, this.session);
  };
  retrieve = async (id: string): Promise<StepsRetrieve> => {
    return await get(Steps.resource, id, null, this.session, "v2");
  };
  update = async (id: string, payload: StepsUpdate): Promise<StepsRetrieve> => {
    return await patch(Steps.resource, id, payload, this.session, "v2");
  };
  create = async (payload: StepsCreate): Promise<StepsRetrieve> => {
    return await post(Steps.resource, payload, this.session, "v2");
  };
  remove = async (id: string): Promise<any> => {
    return await remove(Steps.resource, id, this.session, "v2");
  };
  static list = async (
    filters?: StepsListFilters,
    session?: Session
  ): Promise<PaginatedModel> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Steps.resource, filters, session, "v2");
  };
}
