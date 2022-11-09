import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { post } from "../../utils/rest";
import { MetricsType } from "./models/metrics.models";

export class Metrics {
  private measurement: MetricsType["measurement"];
  private resource = "metrics/";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  retrieve = async (payload: MetricsType): Promise<MetricsType> => {
    return await post(
      this.resource + payload.measurement,
      payload,
      this.session,
      "v1"
    );
  };
}
