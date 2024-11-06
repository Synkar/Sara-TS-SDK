import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { FiltersListType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import {
  LandmarkCreate,
  LandmarkRetrieve,
  LandmarkUpdate,
} from "./models/Landmarks.models";
import { get, getAll, patch, post, remove } from "../../utils/rest";
import { BodyParser } from "../../models/BodyParser";

export * from "./models/Landmarks.models";

export class Landmarks {
  private resource: string;
  session: Session;

  constructor(localityLookup: string, session?: ISession) {
    this.resource = `hivemind/localities/${localityLookup}/landmarks`;
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    filters?: FiltersListType
  ): Promise<PaginatedModel<LandmarkRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<LandmarkRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<LandmarkRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<LandmarkRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: LandmarkCreate): Promise<LandmarkRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (
    id: string,
    payload: LandmarkUpdate
  ): Promise<LandmarkRetrieve> => {
    return await patch(
      this.resource,
      id,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, this.session);
  };
}
