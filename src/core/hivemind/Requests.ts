import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { FiltersListSlugType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import {
  RequestsCreate,
  RequestsList,
  RequestsRetrieve,
} from "./models/Requests.models";
import { get, getAll, patch, post, remove } from "../../utils/rest";

export class Requests {
  private resource = "hivemind/requests";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    filters?: FiltersListSlugType
  ): Promise<PaginatedModel<RequestsList>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListSlugType
  ): AsyncGenerator<RequestsList[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<RequestsList> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<RequestsRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: RequestsCreate): Promise<RequestsRetrieve> => {
    return await post(this.resource, payload, this.session);
  };
}
