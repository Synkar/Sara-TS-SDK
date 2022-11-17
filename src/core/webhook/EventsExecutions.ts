import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { FiltersGeneric } from "../../models/Filters";
import { getAll } from "../../utils/rest";
import { EventsExecutionsList } from "./models/Events_executions.models";
import { WebhookPaginatedModel } from "./models/webhookPaginatedModel";

export class EventsExecutions {
  private resource = "webhooks/events-executions";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  retrieve = async (
    endpoint_uuid: string,
    filters?: FiltersGeneric
  ): Promise<WebhookPaginatedModel<EventsExecutionsList>> => {
    if (!filters) filters = {};
    filters["endpoint"] = endpoint_uuid;
    return await getAll(this.resource, filters, this.session);
  };
}
