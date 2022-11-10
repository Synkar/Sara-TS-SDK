import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  RelationshipsCreate,
  RelationshipsList,
  RelationshipsRetrieve,
  RelationshipsUpdate,
  RelationshipsListFilters,
} from "./models/Relationships.models";

import { Activities as _Activities } from "./Activities";

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
  retrieve = async (id: string): Promise<RelationshipsRetrieve> => {
    return await get(Relationships.resource, id, null, this.session);
  };
  update = async (
    id: string,
    payload: RelationshipsUpdate
  ): Promise<RelationshipsRetrieve> => {
    return await patch(Relationships.resource, id, payload, this.session);
  };
  create = async (
    payload: RelationshipsCreate
  ): Promise<RelationshipsRetrieve> => {
    return await post(Relationships.resource, payload, this.session);
  };
  remove = async (id: string): Promise<boolean> => {
    return await remove(Relationships.resource, id, null, this.session);
  };

  static list = async (
    filters?: RelationshipsListFilters,
    session?: Session
  ): Promise<PaginatedModel<RelationshipsList>> => {
    if (!session) {
      session = Client.session;
    }
    return await getAll(Relationships.resource, filters, session);
  };

  Activities = function (lookup?: string, session?: ISession) {
    return new _Activities(lookup, session);
  } as any as { new (lookup?: string, session?: ISession): any };

  static Activities = _Activities;
}
