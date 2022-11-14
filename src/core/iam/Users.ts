import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { get, getAll, patch, post, remove } from "../../utils/rest";
import {
  UsersCreate,
  UsersRetrieve,
  UsersType,
  UsersUpdate,
} from "./models/Users.models";

export class Users {
  private resource = "iam/users";
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
  ): Promise<PaginatedModel<UsersRetrieve>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListType
  ): AsyncGenerator<UsersRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<UsersRetrieve> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  create = async (payload: UsersCreate): Promise<UsersRetrieve> => {
    return await post(this.resource, payload, this.session);
  };

  retrieve = async (id: string): Promise<UsersRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, this.session);
  };

  update = async (id: string, payload: UsersUpdate): Promise<UsersRetrieve> => {
    return await patch(this.resource, id, payload, this.session);
  };

  me = async (): Promise<UsersRetrieve> => {
    return await get(this.resource, "me", null, this.session);
  };

  verifyUserByEmail = async (email: string): Promise<UsersType> => {
    return await get(
      this.resource,
      "verifyUserByEmail",
      { email },
      this.session
    );
  };
}
