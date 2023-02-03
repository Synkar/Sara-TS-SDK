import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { Session, ISession } from "../../models/Session";
import { get, getAll, patch, post, remove } from "../../utils/rest";
import {
  PoliciesCreate,
  PoliciesRetrieve,
  PoliciesUpdate,
} from "./models/Policies.models";

export * from "./models/Policies.models";
export class Policies {
  private resource = "iam/policies";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: FiltersListType): Promise<PoliciesRetrieve[]> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  create = async (data: PoliciesCreate): Promise<PoliciesRetrieve> => {
    return await post(this.resource, data, this.session);
  };

  retrieve = async (id: string): Promise<PoliciesRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  update = async (
    id: string,
    data: PoliciesUpdate
  ): Promise<PoliciesRetrieve> => {
    return await patch(this.resource, id, data, this.session);
  };

  delete = async (id: string): Promise<boolean> => {
    return await remove(this.resource, id, null, this.session);
  };

  attachPermissions = async (
    id: string,
    actions: string[]
  ): Promise<PoliciesRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachPermissions`,
      actions,
      this.session
    );
  };

  detachPermissions = async (
    id: string,
    actions: string[]
  ): Promise<PoliciesRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachPermissions`,
      null,
      actions,
      this.session
    );
  };
}
