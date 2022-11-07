import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  RealationshipsCreate,
  RelationshipsList,
  RealationshipsRetrieve,
  RealationshipsUpdate,
  RelationshipsListFilters,
} from "./models/Relationships.models";

export class Relationships {
  static resource = "srs/relationships";
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

  list = async (
    filters?: RelationshipsListFilters
  ): Promise<PaginatedModel<RelationshipsList>> => {
    return await Relationships.list(filters, this.session);
  };
  retrieve = async (id: string): Promise<RealationshipsRetrieve> => {
    return await get(Relationships.resource, id, null, this.session, "v1");
  };
  update = async (
    id: string,
    payload: RealationshipsUpdate
  ): Promise<RealationshipsRetrieve> => {
    return await patch(Relationships.resource, id, payload, this.session, "v1");
  };
  create = async (
    payload: RealationshipsCreate
  ): Promise<RealationshipsRetrieve> => {
    return await post(Relationships.resource, payload, this.session, "v1");
  };
  remove = async (id: string): Promise<boolean> => {
    return await remove(Relationships.resource, id, this.session, "v1");
  };

  static list = async (
    filters?: RelationshipsListFilters,
    session?: Session
  ): Promise<PaginatedModel<RelationshipsList>> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Relationships.resource, filters, session, "v1");
  };
}
