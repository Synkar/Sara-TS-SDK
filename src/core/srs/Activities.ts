import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  ActivitiesList,
  ActivitiesRetrieve,
  ActivitiesCreate,
} from "./models/Activities.models";

export * from "./models/Activities.models";
export class Activities {
  static resource = "srs/activities";
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession) {
    this.lookup = lookup;
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (): Promise<PaginatedModel<ActivitiesList>> => {
    return await Activities.list(this.session);
  };
  retrieve = async (id: string): Promise<ActivitiesRetrieve> => {
    return await get(Activities.resource, id, null, this.session);
  };
  create = async (payload: ActivitiesCreate): Promise<ActivitiesRetrieve> => {
    return await post(Activities.resource, payload, this.session);
  };

  static list = async (
    session?: Session
  ): Promise<PaginatedModel<ActivitiesRetrieve>> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Activities.resource, null, session);
  };
}
