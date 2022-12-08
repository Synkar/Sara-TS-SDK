import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { Session, ISession } from "../../models/Session";
import { get, getAll, patch, post, remove } from "../../utils/rest";
import {
  GroupsCreate,
  GroupsRetrieve,
  GroupsUpdate,
} from "./models/Groups.models";

export * from "./models/Groups.models";

export class Groups {
  private resource: "iam/groups";
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
  ): Promise<PaginatedModel<GroupsRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<GroupsRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<GroupsRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<GroupsRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: GroupsCreate): Promise<GroupsRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (
    id: string,
    payload: GroupsUpdate
  ): Promise<GroupsRetrieve> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, this.session);
  };

  attachPolicy = async (
    id: string,
    policy: string
  ): Promise<GroupsRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachPolicy/`,
      { policy },
      this.session
    );
  };

  detachPolicy = async (
    id: string,
    policy: string
  ): Promise<GroupsRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachPolicy/`,
      null,
      { policy },
      this.session
    );
  };

  attachUser = async (id: string, user: string): Promise<GroupsRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachUserGroup/`,
      { user },
      this.session
    );
  };

  detachUser = async (id: string, user: string): Promise<GroupsRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachUserGroup/`,
      null,
      { user },
      this.session
    );
  };
}
