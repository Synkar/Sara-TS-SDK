import { Client } from "../..";
import { Session, ISession } from "../../models/Session";
import { get, getAll } from "../../utils/rest";
import DiagnosticPaginatedModel from "./models/DiagnosticPaginatedModel";
import { DiagnosticsType } from "./models/Diagnostics.models";
import { DiagnosticsFiltersType } from "./models/Filters.models";
import { SrsFeedbackType } from "./models/SrsFeedback.models";

export * from "./models/DiagnosticPaginatedModel";
export * from "./models/Diagnostics.models";
export * from "./models/Filters.models";
export * from "./models/SrsFeedback.models";
export class Telemetry {
  private resource = "telemetry";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  diagnostics = async (
    robot: string,
    filters: DiagnosticsFiltersType
  ): Promise<DiagnosticPaginatedModel<DiagnosticsType>> => {
    return await getAll(
      `${this.resource}/${robot}/diagnostics`,
      filters,
      this.session
    );
  };

  srsFeedback = async (id: string): Promise<SrsFeedbackType> => {
    return await get(`${this.resource}/srs-feedback`, id, null, this.session);
  };
}
