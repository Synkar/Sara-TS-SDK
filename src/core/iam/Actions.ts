import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { get, getAll, post } from "../../utils/rest";
import { ActionRetrieve, ActionType } from "./models/Actions.models";

export class Actions {
  private resource = "iam/actions";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: FiltersListType): Promise<ActionRetrieve[]> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  create = async (payload: ActionType): Promise<ActionRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  retrieve = async (id: string): Promise<ActionRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };
}
