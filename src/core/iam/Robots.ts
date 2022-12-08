import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, patch, post, remove } from "../../utils/rest";
import {
  RobotCreate,
  RobotRetrieve,
  RobotType,
  RobotUpdate,
} from "./models/Robot.models";

export * from "./models/Robot.models";
export class Robots {
  private resource = "iam/robots";
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
  ): Promise<PaginatedModel<RobotRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<RobotRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<RobotRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<RobotRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: RobotCreate): Promise<RobotRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (id: string, payload: RobotUpdate): Promise<RobotRetrieve> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, this.session);
  };

  attachLocality = async (
    id: string,
    locality: string
  ): Promise<RobotRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachLocality`,
      { locality },
      this.session
    );
  };

  detachLocality = async (
    id: string,
    locality: string
  ): Promise<RobotRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachLocality`,
      null,
      { locality },
      this.session
    );
  };
}
