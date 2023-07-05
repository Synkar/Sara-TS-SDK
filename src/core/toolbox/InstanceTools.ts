import { Client } from "../..";
import { BodyParser } from "../../models/BodyParser";
import { ISession, Session } from "../../models/Session";

import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  InstanceToolCreate,
  InstanceToolFilters,
  InstanceToolList,
  InstanceToolRetrieve,
  InstanceToolUpdate,
} from "./models/InstanceTools.models";

import { Executions as _Executions } from "./Executions";

export * from "./models/InstanceTools.models";

export class InstanceTools {
  static resource = "toolbox/instances";
  private lookup?: string;
  private toolLoopup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession, toolLoopup?: string) {
    this.lookup = lookup;

    this.Executions.prototype.parent = this;

    if (toolLoopup) {
      InstanceTools.resource = `toolbox/tools/${toolLoopup}/instances`;
    }

    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: InstanceToolFilters): Promise<InstanceToolList> => {
    if (!filters) filters = {};
    console.log(InstanceTools.resource);
    return await getAll(InstanceTools.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: InstanceToolFilters
  ): AsyncGenerator<InstanceToolRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: InstanceToolList = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<InstanceToolRetrieve> => {
    return await get(InstanceTools.resource, id, null, this.session);
  };

  create = async (
    payload: InstanceToolCreate
  ): Promise<InstanceToolRetrieve> => {
    return await post(
      InstanceTools.resource,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  update = async (
    id: string,
    payload: InstanceToolUpdate
  ): Promise<InstanceToolRetrieve> => {
    return await patch(
      InstanceTools.resource,
      id,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  delete = async (id: string): Promise<InstanceToolRetrieve> => {
    return await remove(InstanceTools.resource, id, null, this.session);
  };

  Executions = function (lookup?: string, session?: ISession) {
    return new _Executions(lookup, session, this.parent?.lookup);
  } as any as { new (lookup?: string, session?: ISession): _Executions };

  static Executions = _Executions;
}
