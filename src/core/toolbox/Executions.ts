import { Client } from "../..";
import { BodyParser } from "../../models/BodyParser";
import { ISession, Session } from "../../models/Session";

import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  ExecutionCreate,
  ExecutionFilters,
  ExecutionList,
  ExecutionRetrieve,
  ExecutionUpdate,
} from "./models/Executions.models";

export * from "./models/Executions.models";

export class Executions {
  static resource = "toolbox/executions";
  private lookup?: string;
  private instanceToolLookup?: string;
  session: Session;

  constructor(
    lookup?: string,
    session?: ISession,
    instanceToolLookup?: string
  ) {
    this.lookup = lookup;
    if (instanceToolLookup) {
      this.instanceToolLookup = instanceToolLookup;
      Executions.resource = `toolbox/instances/${instanceToolLookup}/executions`;
    }

    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (filters?: ExecutionFilters): Promise<ExecutionList> => {
    if (!filters) filters = {};
    console.log(Executions.resource);
    return await getAll(Executions.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: ExecutionFilters
  ): AsyncGenerator<ExecutionRetrieve[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: ExecutionList = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<ExecutionRetrieve> => {
    return await get(Executions.resource, id, null, this.session);
  };

  create = async (payload: ExecutionCreate): Promise<ExecutionRetrieve> => {
    return await post(
      Executions.resource,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  update = async (
    id: string,
    payload: ExecutionUpdate
  ): Promise<ExecutionRetrieve> => {
    return await patch(
      Executions.resource,
      id,
      payload,
      this.session,
      "v1",
      BodyParser.JSON
    );
  };

  delete = async (id: string): Promise<void> => {
    return await remove(Executions.resource, id, null, this.session);
  };
}
