import { Client } from "../..";
import { PaginatedModel } from "../../models/PaginatedModel";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  TagsCreate,
  TagsListFilters,
  TagsRetrieve,
  TagsUpdate,
} from "./models/Tags.models";

export namespace Sara {
  export namespace Missions {
    export class Tags {
      private resource: string = "missions/tags";
      session: Session;

      constructor(session?: ISession) {
        if (session) {
          this.session = new Session(session!);
        } else {
          this.session = Client.session;
        }
      }

      list = async (filters?: TagsListFilters): Promise<PaginatedModel> => {
        return await getAll(this.resource, filters, this.session, "v2");
      };
      retrieve = async (id: string): Promise<TagsRetrieve> => {
        return await get(this.resource, id, null, this.session, "v2");
      };
      update = async (
        id: string,
        payload: TagsUpdate
      ): Promise<TagsRetrieve> => {
        return await patch(this.resource, id, payload, this.session, "v2");
      };
      create = async (payload: TagsCreate): Promise<TagsRetrieve> => {
        return await post(this.resource, payload, this.session, "v2");
      };
      remove = async (id: string): Promise<any> => {
        return await remove(this.resource, id, this.session, "v2");
      };
    }
  }
}
