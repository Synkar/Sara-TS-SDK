import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { get, getAll, post } from "../../utils/rest";
import { ActionRetrieve } from "./models/Actions.models";

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

  list = async (
    filters?: FiltersListType
  ): Promise<PaginatedModel<ActionRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<ActionRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<ActionRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  create = async (payload: ActionRetrieve): Promise<ActionRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  retrieve = async (id: string): Promise<ActionRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };
}
