import { Client } from "../..";
import { FiltersListType } from "../../models/Filters";
import PaginatedModel from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { get, getAll, patch, post, remove } from "../../utils/rest";
import {
  EndpointsList,
  EndpointsCreate,
  EndpointsUpdate,
  EndpointsRetrieve,
  RelationsList,
  RelationsCreate,
} from "./models/Endpoints.models";
import { WebhookPaginatedModel } from "./models/webhookPaginatedModel";

export class Endpoints {
  private resource = "webhook/endpoints";
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
  ): Promise<WebhookPaginatedModel<EndpointsList>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  retrieve = async (id: string): Promise<EndpointsRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (data: EndpointsCreate): Promise<EndpointsRetrieve> => {
    return await post(this.resource, data, this.session);
  };

  update = async (
    id: string,
    data: EndpointsUpdate
  ): Promise<EndpointsRetrieve> => {
    return await patch(this.resource, id, data, this.session);
  };

  delete = async (id: string): Promise<void> => {
    return await remove(this.resource, id, null, this.session);
  };

  list_relations = async (
    id: string
  ): Promise<WebhookPaginatedModel<RelationsList>> => {
    return await getAll(`${this.resource}/${id}/relations`, {}, this.session);
  };
  create_relations = async (
    id: string,
    data: RelationsCreate
  ): Promise<RelationsList> => {
    return await post(`${this.resource}/${id}/relations`, data, this.session);
  };
  delete_relations = async (
    endpointUuid: string,
    relationUuid: string
  ): Promise<void> => {
    return await remove(
      `${this.resource}/${endpointUuid}/relations`,
      relationUuid,
      null,
      this.session
    );
  };
}
