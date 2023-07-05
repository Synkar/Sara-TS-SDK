import { Client } from "../..";
import { BodyParser } from "../../models/BodyParser";
import { ISession, Session } from "../../models/Session";

import { getAll, get, post, patch, remove } from "../../utils/rest";

import {
  GroupCreate,
  GroupFilters,
  GroupList,
  GroupRetrieve,
  GroupUpdate,
} from "./models/Groups.models";
export * from "./models/Groups.models";

export class Groups {
  static resource = "toolbox/groups";
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession) {
    this.lookup = lookup;

    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: GroupFilters): Promise<GroupList> => {
    if (!filters) filters = {};
    return await getAll(Groups.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: GroupFilters
  ): AsyncGenerator<GroupRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: GroupList = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<GroupRetrieve> => {
    return await get(Groups.resource, id, null, this.session);
  };

  create = async (payload: GroupCreate): Promise<GroupRetrieve> => {
    return await post(
      Groups.resource,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  update = async (id: string, payload: GroupUpdate): Promise<GroupRetrieve> => {
    return await patch(
      Groups.resource,
      id,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  delete = async (id: string): Promise<void> => {
    return await remove(Groups.resource, id, null, this.session);
  };
}
