import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { FiltersListSlugType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import {
  HLocalityCreate,
  HLocalityRetrieve,
  HLocalityUpdate,
} from "./models/Localities.models";
import { get, getAll, patch, post, remove } from "../../utils/rest";

import { Landmarks as _Landmarks } from "./Landmarks";

export * from "./models/Localities.models";
export class Localities {
  private resource = "hivemind/localities";
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession) {
    this.lookup = lookup;
    this.Landmarks.prototype.parent = this;

    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    filters?: FiltersListSlugType
  ): Promise<PaginatedModel<HLocalityRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListSlugType
  ): AsyncGenerator<HLocalityRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<HLocalityRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<HLocalityRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: HLocalityCreate): Promise<HLocalityRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (
    id: string,
    payload: HLocalityUpdate
  ): Promise<HLocalityRetrieve> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, this.session);
  };

  Landmarks = function (session?: ISession) {
    return new _Landmarks(this.parent.lookup, session);
  } as any as { new (session?: ISession): _Landmarks };

  static Landmarks = _Landmarks;
}
