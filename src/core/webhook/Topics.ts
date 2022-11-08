import { Client } from "../..";
import { FiltersGeneric } from "../../models/Filters";
import { ISession, Session } from "../../models/Session";
import { get, getAll, patch, post, remove } from "../../utils/rest";
import { TopicsList, TopicsCreate, TopicsType } from "./models/Topics.models";
import { WebhookPaginatedModel } from "./models/webhookPaginatedModel";

export class Topics {
  private resource = "webhook/topics";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    service: string,
    filters?: FiltersGeneric
  ): Promise<WebhookPaginatedModel<TopicsList>> => {
    if (!filters) filters = {};
    filters["service"] = service;
    return await getAll(this.resource, filters, this.session);
  };

  create = async (data: TopicsCreate): Promise<TopicsType> => {
    return await post(this.resource, data, this.session);
  };

  delete = async (service_name: string, action_name: string): Promise<void> => {
    return await remove(
      `${this.resource}/${service_name}/${action_name}`,
      null,
      null,
      this.session
    );
  };
}
