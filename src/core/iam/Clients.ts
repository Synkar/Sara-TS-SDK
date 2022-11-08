import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import { Session, ISession } from "../../models/Session";
import { getAll, post, get, patch, remove } from "../../utils/rest";
import {
  ClientsCreate,
  ClientsRetrieve,
  ClientsUpdate,
} from "./models/Client.models";

export class Clients {
  private resource = "iam/clients";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: FiltersListType): Promise<ClientsRetrieve[]> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  create = async (data: ClientsCreate): Promise<ClientsRetrieve> => {
    return await post(this.resource, data, this.session);
  };

  retrieve = async (id: string): Promise<ClientsRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  update = async (
    id: string,
    data: ClientsUpdate
  ): Promise<ClientsRetrieve> => {
    return await patch(this.resource, id, data, this.session);
  };

  delete = async (id: string): Promise<void> => {
    return await remove(this.resource, id, null, this.session);
  };

  attachUser = async (id: string, user: string): Promise<ClientsRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachUser`,
      { user },
      this.session
    );
  };

  detachUser = async (id: string, user: string): Promise<ClientsRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachUser`,
      null,
      { user },
      this.session
    );
  };

  attachRobot = async (id: string, robot: string): Promise<ClientsRetrieve> => {
    return await post(
      `${this.resource}/${id}/attachRobot`,
      { robot },
      this.session
    );
  };

  detachRobot = async (id: string, robot: string): Promise<ClientsRetrieve> => {
    return await remove(
      `${this.resource}/${id}/attachRobot`,
      null,
      { robot },
      this.session
    );
  };
}
