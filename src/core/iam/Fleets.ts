import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import { RetrieveFleet, FleetType, UpdateFleet } from "./models/Fleet.models";

export class Fleets {
  private resource = "iam/fleets";
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
  ): Promise<PaginatedModel<RetrieveFleet>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<RetrieveFleet[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<RetrieveFleet> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<RetrieveFleet> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: FleetType): Promise<RetrieveFleet> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (id: string, payload: UpdateFleet): Promise<RetrieveFleet> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<void> => {
    return await remove(this.resource, id, this.session);
  };

  attachRobot = async (id: string, robot: string): Promise<void> => {
    return await post(
      `${this.resource}/${id}/attachRobot`,
      { robot },
      this.session
    );
  };

  detachRobot = async (id: string, robot: string): Promise<void> => {
    return await remove(
      `${this.resource}/${id}/attachRobot`,
      null,
      { robot },
      this.session
    );
  };
}
