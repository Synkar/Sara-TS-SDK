import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  FleetCreate,
  FleetRetrieve,
  FleetType,
  FleetUpdate,
} from "./models/Fleet.models";

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
  ): Promise<PaginatedModel<FleetRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<FleetRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<FleetRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<FleetRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: FleetCreate): Promise<FleetRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (id: string, payload: FleetUpdate): Promise<FleetRetrieve> => {
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
