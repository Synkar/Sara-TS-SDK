import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll } from "../../utils/rest";

export class Hivemind {
  private resource = "hivemind";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }
}
