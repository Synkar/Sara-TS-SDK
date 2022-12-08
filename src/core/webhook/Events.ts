import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { get } from "../../utils/rest";
import { EventsRetrieve } from "./models/Events.models";

export * from "./models/Events.models";
export class Events {
  private resource = "webhook/events";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  retrieve = async (id: string): Promise<EventsRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };
}
