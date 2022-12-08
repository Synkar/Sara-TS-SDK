import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch } from "../../utils/rest";
import {
  MissionsCreate,
  MissionsList,
  MissionsListFilters,
  MissionsRetrieve,
  MissionsUpdate,
} from "./models/Missions.models";

import { Stages as _Stages } from "./Stages";
import { Steps as _Steps } from "./Steps";
import { Tags as _Tags } from "./Tags";

export * from "./Stages";
export * from "./Steps";
export * from "./Tags";
export * from "./models/Missions.models";
export * from "./models/ParamValues.models";
export class Missions {
  private resource = "missions";
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession) {
    this.lookup = lookup;
    this.Stages.prototype.parent = this;
    this.Steps.prototype.parent = this;
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    robot_id: string,
    filters?: MissionsListFilters
  ): Promise<PaginatedModel<MissionsList>> => {
    if (!filters) filters = {};
    filters["robot_id"] = robot_id;
    return await getAll(this.resource, filters, this.session, "v2");
  };

  listPaginated = async function* (
    robot_id: string,
    filters?: MissionsListFilters
  ): AsyncGenerator<MissionsList[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json = await this.list(robot_id, filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<MissionsRetrieve> => {
    return await get(this.resource, id, null, this.session, "v2");
  };
  update = async (
    id: string,
    payload: MissionsUpdate
  ): Promise<MissionsRetrieve> => {
    return await patch(this.resource, id, payload, this.session, "v2");
  };
  create = async (payload: MissionsCreate): Promise<MissionsRetrieve> => {
    return await post(this.resource, payload, this.session, "v2");
  };

  last = async (robot_id: string): Promise<MissionsRetrieve> => {
    const filters = { robot_id: robot_id };
    return await getAll(`${this.resource}/last`, filters, this.session, "v2");
  };

  retry = async (uuid: string): Promise<boolean> => {
    return await post(`${this.resource}/${uuid}/retry`, {}, this.session, "v2");
  };

  cancel = async (uuid: string): Promise<boolean> => {
    return await post(
      `${this.resource}/${uuid}/cancel`,
      null,
      this.session,
      "v2"
    );
  };

  pause = async (uuid: string): Promise<boolean> => {
    return await post(
      `${this.resource}/${uuid}/pause`,
      null,
      this.session,
      "v2"
    );
  };

  resume = async (uuid: string): Promise<boolean> => {
    return await post(
      `${this.resource}/${uuid}/resume`,
      null,
      this.session,
      "v2"
    );
  };

  Stages = function (lookup?: string, session?: ISession) {
    return new _Stages(lookup, session, this.parent.lookup);
  } as any as { new (lookup?: string, session?: ISession): any };

  Steps = function (session?: ISession) {
    return new _Steps(session, this.parent.lookup);
  } as any as { new (session?: ISession): any };

  Tags = function (session?: ISession) {
    return new _Tags(session, this.parent.lookup);
  } as any as { new (session?: ISession): any };

  static Stages = _Stages;
  static Steps = _Steps;
  static Tags = _Tags;
}
