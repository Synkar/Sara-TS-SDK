import { Client } from "../..";
import { ISession, Session } from "../../models/Session";
import { getAll, get, post, patch, remove } from "../../utils/rest";
import {
  StagesCreate,
  StagesRetrieve,
  StagesUpdate,
} from "./models/Stages.models";

export namespace Sara {
  export namespace Missions {
    export class Stages {
      private resource: string = "missions/stages";
      session: Session;

      constructor(session?: ISession) {
        if (session) {
          this.session = new Session(session!);
        } else {
          this.session = Client.session;
        }
      }

      list = async (filters?: any): Promise<any> => {
        return await getAll(this.resource, filters, this.session, "v2");
      };
      retrieve = async (id: string, filters?: any): Promise<StagesRetrieve> => {
        return await get(this.resource, id, filters, this.session, "v2");
      };
      update = async (
        id: string,
        payload: StagesUpdate
      ): Promise<StagesRetrieve> => {
        return await patch(this.resource, id, payload, this.session, "v2");
      };
      create = async (payload: StagesCreate): Promise<StagesRetrieve> => {
        return await post(this.resource, payload, this.session, "v2");
      };
      remove = async (id: string): Promise<any> => {
        return await remove(this.resource, id, this.session, "v2");
      };
    }
  }
}
