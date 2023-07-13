import { Client } from "../..";
import { BodyParser } from "../../models/BodyParser";
import { ISession, Session } from "../../models/Session";

import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  ToolCreate,
  ToolFilters,
  ToolList,
  ToolRetrieve,
  ToolUpdate,
} from "./models/Tools.models";

import { InstanceTools as _InstanceTools } from "./InstanceTools";

export * from "./models/Tools.models";

export class Tools {
  static resource = "toolbox/tools";
  private lookup?: string;
  session: Session;

  constructor(lookup?: string, session?: ISession) {
    this.lookup = lookup;

    this.InstanceTools.prototype.parent = this;

    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: ToolFilters): Promise<ToolList> => {
    if (!filters) filters = {};
    return await getAll(Tools.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: ToolFilters
  ): AsyncGenerator<ToolRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: ToolList = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<ToolRetrieve> => {
    return await get(Tools.resource, id, null, this.session);
  };

  create = async (payload: ToolCreate): Promise<ToolRetrieve> => {
    return await post(
      Tools.resource,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  update = async (id: string, payload: ToolUpdate): Promise<ToolRetrieve> => {
    return await patch(
      Tools.resource,
      id,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  delete = async (id: string): Promise<void> => {
    return await remove(Tools.resource, id, null, this.session);
  };

  InstanceTools = function (lookup?: string, session?: ISession) {
    return new _InstanceTools(
      lookup,
      session,
      this.parent && this.parent.lookup ? this.parent.lookup : undefined
    );
  } as any as { new (lookup?: string, session?: ISession): _InstanceTools };

  static InstanceTools = _InstanceTools;
}
