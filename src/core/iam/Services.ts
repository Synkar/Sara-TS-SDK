import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { get, post } from "../../utils/rest";
import { ServicesCreate, ServicesRetrieve } from "./models/Services.models";

export class Services {
  private resource = "iam/services";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (): Promise<ServicesRetrieve> => {
    return await get(this.resource, null, null, this.session);
  };

  retrieve = async (id: string): Promise<ServicesRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (payload: ServicesCreate): Promise<ServicesRetrieve> => {
    return await post(this.resource, payload, this.session);
  };
}
