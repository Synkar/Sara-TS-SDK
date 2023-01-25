import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  LocalityCreate,
  LocalityRetrieve,
  LocalityUpdate,
} from "./models/Locality.models";

export * from "./models/Locality.models";

export class Localities {
  private resource = "iam/localities";
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
  ): Promise<PaginatedModel<LocalityRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
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

  attachRobot = async (
    id: string,
    robot: string
  ): Promise<LocalityRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachRobot`,
      { robot },
      this.session
    );
  };

  detachRobot = async (
    id: string,
    robot: string
  ): Promise<LocalityRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachRobot`,
      null,
      { robot },
      this.session
    );
  };
}
