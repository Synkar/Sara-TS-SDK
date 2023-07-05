import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { FiltersListSlugType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import {
  LocalityCreate,
  LocalityRetrieve,
  LocalityUpdate,
} from "./models/Localities.models";
import { get, getAll, patch, post, remove } from "../../utils/rest";

export class Localities {
  private resource = "hivemind/localities";
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
  ): Promise<PaginatedModel<LocalityRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListSlugType
  ): AsyncGenerator<LocalityRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<LocalityRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<LocalityRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: LocalityCreate): Promise<LocalityRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (
    id: string,
    payload: LocalityUpdate
  ): Promise<LocalityRetrieve> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, this.session);
  };
}
