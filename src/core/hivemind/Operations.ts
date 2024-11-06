import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { FiltersListSlugType } from "../../models/Filters";
import { PaginatedModel } from "../../models/PaginatedModel";
import {
  OperationList,
  OperationCreate,
  OperationRetrieve,
  OperationUpdate,
  OperationRequestBodyRetrieve,
  OperationCreateResponse,
} from "./models/Operations.models";
import { get, getAll, patch, post, remove } from "../../utils/rest";

export * from "./models/Operations.models";
export class Operations {
  private resource = "hivemind/operations";
  session: Session;

  constructor(session?: ISession) {
    if (session) {
      this.session = new Session(session);
    } else {
      this.session = Client.session;
    }
  }

  list = async (
    filters?: FiltersListSlugType
  ): Promise<PaginatedModel<OperationList>> => {
    if (!filters) filters = {};
    return await getAll(this.resource, filters, this.session);
  };

  listPaginated = async function* (
    filters?: FiltersListSlugType
  ): AsyncGenerator<OperationList[]> {
    if (!filters) filters = {};
    let page: number = parseInt(filters.page) || 1;

    while (true) {
      filters.page = String(page);
      const json: PaginatedModel<OperationList> = await this.list(filters);
      yield json.results || [];
      if (!json.next) {
        break;
      }
      page++;
    }
  };

  retrieve = async (id: string): Promise<OperationRetrieve> => {
    return await get(this.resource, id, null, this.session);
  };

  create = async (
    payload: OperationCreate
  ): Promise<OperationCreateResponse> => {
    return await post(this.resource, payload, this.session);
  };

  update = async (
    id: string,
    payload: OperationUpdate
  ): Promise<OperationRetrieve> => {
    return await patch(this.resource, id, payload, this.session);
  };

  delete = async (id: string): Promise<void> => {
    return await remove(this.resource, id, this.session);
  };

  retrieveRequestBody = async (
    id: string
  ): Promise<OperationRequestBodyRetrieve> => {
    return await get(
      `${this.resource}/${id}/request-body`,
      null,
      null,
      this.session
    );
  };
}
